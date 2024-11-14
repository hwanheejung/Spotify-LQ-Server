import { getSpotifyUserData } from "../../../features/auth/services/spotifyService.js";

export const userResolver = {
  Query: {
    getUserInfo: async (_: unknown, __: unknown) => {
      console.log("I'm called");
      //   if (!spotifyAccessToken) {
      //     throw new Error("Authorization token is required");
      //   }

      //   try {
      //     const data = await getSpotifyUserData(spotifyAccessToken);
      //     return data;
      //   } catch (error) {
      //     console.error("Failed to fetch Spotify user data:", error);
      //     throw new Error("Failed to fetch Spotify user data");
      //   }
    },
  },
};
