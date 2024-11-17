import { albumsResolver, usersResolver } from "./resolvers/index.js";
import { albumsSchema, userSchema } from "./schema/index.js";

export const typeDefs = [userSchema, albumsSchema];
export const resolvers = [usersResolver, albumsResolver];
