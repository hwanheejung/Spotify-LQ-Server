import axios from "axios";
import { IUser } from "../../../features/user/models/User.js";

export const userResolver = {
  Query: {
    getUserInfo: async (_: unknown, __: unknown, { user }: { user: IUser }) => {
      if (!user) {
        throw new Error("User not found");
      }
      const result = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${user.spotifyToken.accessToken}` },
      });

      return result.data;
    },
  },
};
