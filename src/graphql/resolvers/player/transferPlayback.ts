import { ERROR } from "../../../lib/constants/error.js";
import { MyContext } from "../../context.js";

export const transferPlayback = async (
  _: unknown,
  { deviceId }: { deviceId: string },
  context: MyContext
) => {
  if (!context.isAuthenticated) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }
  const { spotifyAxios } = context;
  try {
    await spotifyAxios.put(`/me/player`, {
      device_ids: [deviceId],
      play: true,
    });

    return true;
  } catch (error) {
    console.error("Error getting available devices", error);
    throw new Error("Failed to fetch getAvailableDevices from Spotify API");
  }
};
