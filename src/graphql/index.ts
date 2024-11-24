import {
  albumsResolver,
  usersResolver,
  artistsResolver,
  playerResolver,
} from "./resolvers/index.js";
import {
  albumsSchema,
  userSchema,
  artistsSchema,
  playerSchema,
} from "./schema/index.js";

export const typeDefs = [userSchema, albumsSchema, artistsSchema, playerSchema];
export const resolvers = [
  usersResolver,
  albumsResolver,
  artistsResolver,
  playerResolver,
];
