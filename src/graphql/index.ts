import { makeExecutableSchema } from "@graphql-tools/schema";
import { albumResolvers, albumTypeDefs } from "./album/index.js";
import { artistResolvers, artistTypeDefs } from "./artist/index.js";
import { playerResolvers, playerTypeDefs } from "./player/index.js";

export const schema = makeExecutableSchema({
  typeDefs: [albumTypeDefs, artistTypeDefs, playerTypeDefs],
  resolvers: [albumResolvers, artistResolvers, playerResolvers],
});
