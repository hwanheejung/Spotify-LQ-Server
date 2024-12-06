import { CurrentTrack } from "./CurrentTrack.js";
import { playerMutations } from "./mutations.js";
import { playerQueries } from "./queries.js";

const playerResolvers = {
  Query: playerQueries,
  CurrentTrack,
  Mutation: playerMutations,
};

export default playerResolvers;
