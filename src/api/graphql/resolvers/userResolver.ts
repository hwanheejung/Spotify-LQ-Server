import { spotifyService } from "../../../features/auth/services/spotifyService.js";
import { IUser } from "../../../features/user/models/User.js";

export const userResolver = {
  Query: {
    getUserInfo: async (_: unknown, __: unknown, { user }: { user: IUser }) => {
      if (!user) {
        throw new Error("User not found");
      }
      const data = await spotifyService.getSpotifyUserData(
        user.spotifyToken.accessToken
      );

      return data;
    },
  },
};
