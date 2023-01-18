import gql from "graphql-tag";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ServerContext } from "../types/server";
import { User } from "@prisma/client";

interface LoginArgs {
  email: string;
  password: string;
}

interface SingUpArgs extends LoginArgs {
  name: string;
}

export const Schema = gql`
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
      const password = await bcrypt.hash(args.password, 10);
      const user = await prisma.user.create({ data: { ...args, password } });
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

      return {
        token,
        user,
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
