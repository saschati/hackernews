import gql from "graphql-tag";
import { ServerContext } from "../types/server";
import { Vote } from "@prisma/client";

export const SUBSCRIBE_VOTE_NEW_VOTE = "vote_new_vote";

interface VoteArgs {
  linkId: number;
}

export const Schema = gql`
  type Mutation {
    vote(linkId: ID!): Vote
  }

  type Subscription {
    newVote: Vote
  }

  type Vote {
    id: ID!
    link: Link!
    user: User!
  }
`;

export const Resolver = {
  Vote: {
    link: (parent: Vote, _: undefined, { prisma }: ServerContext) => {
      return prisma.vote.findUnique({ where: { id: parent.id } }).link();
    },
    user: (parent: Vote, _: undefined, { prisma }: ServerContext) => {
      return prisma.vote.findUnique({ where: { id: parent.id } }).user();
    },
  },
  Subscription: {
    newVote: {
      subscribe: (_: undefined, __: undefined, { pubsub }: ServerContext) =>
        pubsub.asyncIterator(SUBSCRIBE_VOTE_NEW_VOTE),
      resolve: (payload: Vote) => payload,
    },
  },
  Mutation: {
    vote: async (
      _: undefined,
      args: VoteArgs,
      { prisma, pubsub, userId }: ServerContext
    ) => {
      if (!userId) {
        throw new Error("User can't be empty.");
      }

      const vote = await prisma.vote.findUnique({
        where: {
          linkId_userId: {
            linkId: Number(args.linkId),
            userId,
          },
        },
      });

      if (Boolean(vote)) {
        throw new Error(`Already voted for link: ${args.linkId}`);
      }

      const newVote = prisma.vote.create({
        data: {
          user: { connect: { id: userId } },
          link: { connect: { id: Number(args.linkId) } },
        },
      });

      pubsub.publish(SUBSCRIBE_VOTE_NEW_VOTE, newVote);

      return newVote;
    },
  },
};
