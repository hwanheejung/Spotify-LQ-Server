import { ERROR } from "../../../lib/constants/error.js";
import throwError from "../../../lib/utils/throwError.js";
import { MyContext } from "../../context.js";

export const getQueue = async (_: unknown, {}, context: MyContext) => {
  if (!context.isAuthenticated) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }

  const { spotifyAxios } = context;
  try {
    const data = await spotifyAxios.get(`/me/player/queue`);

    return data;
  } catch (error: any) {
    throwError(`Error getting album tracks: ${error.message}`);
  }
};
