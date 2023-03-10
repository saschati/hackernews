import { Link } from "@prisma/client";
import gql from "graphql-tag";
import { PagginationQueryArgs, Sort } from "../types/common";
import { ServerContext } from "../types/server";

export const SUBSCRIBE_LINK_NEW_LINK = "link_new_link";

interface LinksSortArgs {
  description: Sort;
  url: Sort;
  createdAt: Sort;
}

interface LinksQueryArgs {
  filter: string;
  paggin: PagginationQueryArgs;
  orderBy: LinksSortArgs;
}

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
    links(
      filter: String
      paggin: Paggination
      orderBy: LinkOrderByInput
    ): LinkRecord!
    link(id: ID!): Link
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String!, description: String!): Link
    deleteLink(id: ID!): Link
  }

  type Subscription {
    newLink: Link
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    createdAt: String!
    postedBy: User
    votes: [Vote!]!
  }

  input LinkOrderByInput {
    description: Sort
    url: Sort
    createdAt: Sort
  }

  type LinkRecord implements Record {
    records: [Link!]!
    total: Int!
  }
`;

export const Resolver = {
  Query: {
    links: async (
      _: undefined,
      { paggin, orderBy, ...args }: LinksQueryArgs,
      { prisma }: ServerContext
    ) => {
      const condition = {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      };
      const where = args.filter ? condition : {};
      const take = paggin?.take || 3;
      const skip = paggin?.skip || 0;

      const records = await prisma.link.findMany({
        where,
        take,
        skip,
        orderBy,
      });

      const total = await prisma.link.count({ where });

      return {
        records,
        total,
      };
    },
    link: async (_: undefined, args: LinkArgs, { prisma }: ServerContext) => {
      return prisma.link.findFirst({ where: { id: Number(args.id) } });
    },
  },
  Subscription: {
    newLink: {
      subscribe: (_: undefined, __: undefined, { pubsub }: ServerContext) =>
        pubsub.asyncIterator(SUBSCRIBE_LINK_NEW_LINK),
      resolve: (payload: Link) => payload,
    },
  },
  Link: {
    postedBy: (parent: Link, _: undefined, { prisma }: ServerContext) => {
      return prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
    },
    votes: (parent: Link, _: undefined, { prisma }: ServerContext) =>
      prisma.link.findUnique({ where: { id: parent.id } }).votes(),
    createdAt: (parent: Link) => new Date(parent.createdAt).toISOString(),
  },
  Mutation: {
    postLink: async (
      _: undefined,
      args: PostLinkArgs,
      { prisma, userId, pubsub }: ServerContext
    ) => {
      if (!userId) {
        throw new Error("User not found.");
      }

      const link = await prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
          postedBy: { connect: { id: userId } },
        },
      });

      pubsub.publish(SUBSCRIBE_LINK_NEW_LINK, link);

      return link;
    },
    updateLink: async (
      _: undefined,
      args: UpdateLinkArgs,
      { prisma }: ServerContext
    ) => {
      const link = await prisma.link.findUnique({
        where: { id: Number(args.id) },
      });

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
    deleteLink: async (
      _: undefined,
      args: LinkArgs,
      { prisma }: ServerContext
    ) => {
      const link = await prisma.link.findUnique({
        where: { id: Number(args.id) },
      });

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
