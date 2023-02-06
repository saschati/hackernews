import gql from "graphql-tag";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ServerContext } from "../types/server";
import { User } from "@prisma/client";
import { getUserId } from "../utils/auth";

interface UserArgs {
  token?: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface SingUpArgs extends LoginArgs {
  name: string;
}

export const Schema = gql`
  type Query {
    user(token: String): User!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
    votes: [Vote!]!
  }
`;

export const Resolver = {
  Query: {
    user: async (
      _: undefined,
      args: UserArgs,
      { prisma, userId }: ServerContext
    ) => {
      if (!userId && !args.token) {
        throw new Error("The user is not authorized.");
      }

      const id = args.token ? getUserId(undefined, args.token) : Number(userId);

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("User is not available.");
      }

      return user;
    },
  },
  User: {
    links: (parent: User, _: undefined, { prisma }: ServerContext) => {
      return prisma.user.findUnique({ where: { id: parent.id } }).links();
    },
    votes: (parent: User, _: undefined, { prisma }: ServerContext) =>
      prisma.user.findUnique({ where: { id: parent.id } }).votes(),
  },
  Mutation: {
    signup: async (
      _: undefined,
      args: SingUpArgs,
      { prisma }: ServerContext
    ) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (user) {
        throw new Error("User with email already exists");
      }

      const password = await bcrypt.hash(args.password, 10);
      const newUser = await prisma.user.create({ data: { ...args, password } });
      const token = jwt.sign({ userId: newUser.id }, process.env.APP_SECRET);

      return {
        token,
        user: newUser,
      };
    },
    login: async (_: undefined, args: LoginArgs, { prisma }: ServerContext) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (!user) {
        throw new Error("No such user found");
      }

      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

      return {
        token,
        user,
      };
    },
  },
};
