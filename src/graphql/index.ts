import {
  albumsResolver,
  usersResolver,
  artistsResolver,
} from "./resolvers/index.js";
import { albumsSchema, userSchema, artistsSchema } from "./schema/index.js";

export const typeDefs = [userSchema, albumsSchema, artistsSchema];
export const resolvers = [usersResolver, albumsResolver, artistsResolver];
