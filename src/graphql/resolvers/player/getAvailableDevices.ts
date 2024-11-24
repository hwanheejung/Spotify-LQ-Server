import axios from "axios";
import { ERROR } from "../../../lib/constants/error.js";
import { IUser } from "../../../models/User.js";
import { SPOTIFY_BASE } from "../../../lib/constants/spotify.js";

export const getAvailableDevices = async (
  _: unknown,
  __: unknown,
  { user }: { user: IUser }
) => {
  if (!user) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }

  try {
    const response = await axios.get(`${SPOTIFY_BASE}/v1/me/player/devices`, {
      headers: {
        Authorization: `Bearer ${user.spotifyToken.accessToken}`,
      },
    });

    const data = response.data;

    return (data.devices || []).map((device: any) => ({
      id: device.id || null,
      is_active: device.is_active || null,
      is_private_session: device.is_private_session || null,
      is_restricted: device.is_restricted || null,
      name: device.name || null,
      type: device.type || null,
      volume_percent: device.volume_percent || null,
      supports_volume: device.supports_volume || null,
    }));
  } catch (error) {
    console.error("Error getting available devices", error);
    throw new Error("Failed to fetch getAvailableDevices from Spotify API");
  }
};
