import { ERROR } from "../../../lib/constants/error.js";
import throwError from "../../../lib/utils/throwError.js";
import { MyContext } from "../../context.js";

export const getAvailableDevices = async (
  _: unknown,
  __: unknown,
  context: MyContext
) => {
  if (!context.isAuthenticated) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }
  const { spotifyAxios } = context;
  try {
    const data = await spotifyAxios.get(`/me/player/devices`);

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
  } catch (error: any) {
    throwError(`Error getting available devices: ${error.message}`);
  }
};
