import gql from "graphql-tag";
import { ServerContext } from "../types/server";

interface LinkArgs {
  id: number;
}

interface PostLinkArgs {
  url: string;
  description: string;
}

interface UpdateLinkArgs extends LinkArgs, PostLinkArgs {}

export const Schema = gql`
  type Query {
    links: [Link!]!
    link(id: ID!): Link
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String!, description: String!): Link
    deleteLink(id: ID!): Link
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

export const Resolver = {
  Query: {
    links: async (_: undefined, __: undefined, { prisma }: ServerContext) => {
      return prisma.link.findMany();
    },
    link: async (_: undefined, args: LinkArgs, { prisma }: ServerContext) => {
       return prisma.link.findFirst({ where: { id: Number(args.id) } });
    },
  },
  Mutation: {
    postLink: async (_: undefined, args: PostLinkArgs, { prisma }: ServerContext) => {
      const link = await prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });

      return link;
    },
    updateLink: async (_: undefined, args: UpdateLinkArgs, { prisma }: ServerContext) => {
      const link = await prisma.link.findFirst({ where: { id: Number(args.id) } });

      if (!link) {
        throw new Error("Link cannot be empty.");
      }

      const updateData = {
        description: args.description,
        url: args.url,
      };

      const updatedLink = await prisma.link.update({
        where: {
          id: link.id,
        },
        data: updateData,
      });

      return updatedLink;
    },
    deleteLink: async (_: undefined, args: LinkArgs, { prisma }: ServerContext) => {
      const link = await prisma.link.findFirst({ where: { id: Number(args.id) } });

      if (!link) {
        throw new Error("Link cannot be empty.");
      }

      const deleteLink = await prisma.link.delete({
        where: {
          id: link.id,
        },
      });

      return deleteLink;
    },
  },
};
