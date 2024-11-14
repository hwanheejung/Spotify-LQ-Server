import { userResolver } from "./resolvers/index.js";
import { userGQLSchema } from "./schema/index.js";

export const typeDefs = [userGQLSchema];
export const resolvers = [userResolver];
