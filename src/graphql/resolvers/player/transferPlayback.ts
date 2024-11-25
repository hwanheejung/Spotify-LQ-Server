import axios from "axios";
import { ERROR } from "../../../lib/constants/error.js";
import { IUser } from "../../../models/User.js";
import { SPOTIFY_BASE } from "../../../lib/constants/spotify.js";

export const transferPlayback = async (
  _: unknown,
  { deviceId }: { deviceId: string },
  { user }: { user: IUser }
) => {
  if (!user) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }

  try {
    await axios.put(
      `${SPOTIFY_BASE}/v1/me/player`,
      {
        device_ids: [deviceId],
        play: true,
      },
      {
        headers: {
          Authorization: `Bearer ${user.spotifyToken.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return true;
  } catch (error) {
    console.error("Error getting available devices", error);
    throw new Error("Failed to fetch getAvailableDevices from Spotify API");
  }
};
