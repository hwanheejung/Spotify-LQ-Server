import cors from "cors";
import express from "express";
import authRouter from "./routers/authRouter.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

//
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// 리졸버 정의
const resolvers = {
  Query: {
    hello: () => "Hello from Apollo Server!",
  },
};
//

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      return { token };
    },
  })
);

app.use("/api/auth", authRouter);

export default httpServer;
