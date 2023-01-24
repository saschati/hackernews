import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { WsConnectionParams, ServerContext } from "./types/server";
import { getUserId } from "./utils/auth";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { Context } from "graphql-ws/lib/server";

const pubsub = new PubSub();
const prisma = new PrismaClient();
const port: number =
  (process.env.APP_PORT && Number(process.env.APP_PORT)) || 3000;

const app: express.Express = express();
const httpServer: http.Server = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql/ws",
});
const serverCleanup = useServer(
  {
    schema,
    context: async (context: Context<WsConnectionParams>) => ({
      prisma,
      pubsub,
      userId: context.connectionParams
        ? getUserId(context.connectionParams.Authorization)
        : null,
    }),
  },
  wsServer
);

const server = new ApolloServer<ServerContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();

app.use(
  "/graphql",
  bodyParser.json({ limit: "50mb" }),
  expressMiddleware<ServerContext>(server, {
    context: async ({ req }) => ({
      prisma,
      pubsub,
      userId:
        req && req.headers.authorization
          ? getUserId(req.headers.authorization)
          : null,
    }),
  })
);

await new Promise<void>((resolve) => {
  httpServer.listen({ port }, resolve);
});

console.log(`🚀 Server ready`);
