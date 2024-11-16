import { spotifyService } from "../../../features/auth/services/spotifyService";
import { IUser } from "../../../features/user/models/User";

export const userResolver = {
  Query: {
    getUserInfo: async (
      _: unknown,
      __: unknown,
      {
        user,
      }: {
        user: IUser;
      }
    ) => {
      const data = await spotifyService.getSpotifyUserData(
        user.spotifyToken.accessToken
      );
      return data;
    },
  },
};
