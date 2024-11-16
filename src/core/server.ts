import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "fs";
import https from "https";
import { MyContext, context } from "../api/graphql/context.js";
import { resolvers, typeDefs } from "../api/graphql/index.js";
import authRouter from "../api/rest/authRouter.js";

const options = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

const app = express();
const httpsServer = https.createServer(options, app);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true,
  })
);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === "development",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: httpsServer })],
});

await server.start();

app.use("/api/auth", authRouter);
app.use("/graphql", express.json(), expressMiddleware(server, { context }));

export default httpsServer;
