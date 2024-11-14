import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "http";
import { resolvers, typeDefs } from "../api/graphql/index.js";
import { MyContext, context } from "../api/graphql/context.js";
import authRouter from "../api/rest/authRouter.js";

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {})
);

app.use("/api/auth", authRouter);

export default httpServer;
