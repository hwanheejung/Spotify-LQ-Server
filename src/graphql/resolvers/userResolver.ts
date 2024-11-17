import axios from "axios";
import { IUser } from "../../models/User.js";
import { SPOTIFY_BASE } from "../../lib/constants/spotify.js";

export const userResolver = {
  Query: {
    getUserInfo: async (_: unknown, __: unknown, { user }: { user: IUser }) => {
      if (!user) {
        throw new Error("User not found");
      }
      const result = await axios.get(`${SPOTIFY_BASE}/v1/me`, {
        headers: { Authorization: `Bearer ${user.spotifyToken.accessToken}` },
      });

      return result.data;
    },
  },
};
