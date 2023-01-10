import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client'
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from './resolvers'
import typeDefs from "./schema";
import { ServerContext } from './types/server';

const prisma = new PrismaClient()
const port: number = (process.env.API_PORT && Number(process.env.API_PORT)) || 3000;

const server = new ApolloServer<ServerContext>({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async () => ({ prisma }),
  listen: { port },
});
console.log(`🚀  Server ready at ${url}`);