import { albumsResolver, userResolver } from "./resolvers/index.js";
import { albumsGQLSchema, userGQLSchema } from "./schema/index.js";

export const typeDefs = [userGQLSchema, albumsGQLSchema];
export const resolvers = [userResolver, albumsResolver];
