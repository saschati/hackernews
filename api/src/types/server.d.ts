import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";

export interface ServerContext {
  prisma: PrismaClient;
  pubsub: PubSub;
  userId: number | null;
}

export type WsConnectionParams = Record<'Authorization', string | undefined>