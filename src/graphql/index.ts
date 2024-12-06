import { makeExecutableSchema } from "@graphql-tools/schema";
import { albumResolvers, albumTypeDefs } from "./album/index.js";
import { artistResolvers, artistTypeDefs } from "./artist/index.js";
import { playerResolvers, playerTypeDefs } from "./player/index.js";
import { searchResolvers, searchTypeDefs } from "./search/index.js";
import { commonTypeDefs } from "./commonSchema.js";

export const schema = makeExecutableSchema({
  typeDefs: [
    commonTypeDefs,
    albumTypeDefs,
    artistTypeDefs,
    playerTypeDefs,
    searchTypeDefs,
  ],
  resolvers: [
    albumResolvers,
    artistResolvers,
    playerResolvers,
    searchResolvers,
  ],
});
