import { userResolver, albumResolver } from "./resolvers/index.js";
import { userGQLSchema, albumGQLSchema } from "./schema/index.js";

export const typeDefs = [userGQLSchema, albumGQLSchema];
export const resolvers = [userResolver, albumResolver];
