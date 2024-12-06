import { ERROR } from "../../../lib/constants/error.js";
import { MyContext } from "../../context.js";

const mapDevice = (device: any) => ({
  id: device.id,
  is_active: device.is_active,
  is_private_session: device.is_private_session,
  is_restricted: device.is_restricted,
  name: device.name,
  type: device.type,
  volume_percent: device.volume_percent,
  supports_volume: device.supports_volume,
});

const mapTrack = (track: any) => ({
  id: track?.id || null,
  name: track?.name || "",
  album: track.album
    ? {
        id: track.album.id || null,
        name: track.album.name || "",
        images: track.album.images || [],
      }
    : null,
  artists: track.artists
    ? track.artists.map((artist: any) => ({
        id: artist.id || null,
        name: artist.name || "",
      }))
    : [],
  duration_ms: track?.duration_ms || 0,
});

export const playerQueries = {
  player: async (_: unknown, __: unknown, context: MyContext) => {
    if (!context.isAuthenticated) throw new Error(ERROR.USER_NOT_FOUND);
    const { spotifyAxios } = context;

    const data = await spotifyAxios.get(`/me/player/queue`);

    return {
      currentTrack: mapTrack(data.currently_playing),
      queue: (data.queue || []).map(mapTrack),
    };
  },
  availableDevices: async (_: unknown, __: unknown, context: MyContext) => {
    if (!context.isAuthenticated) throw new Error(ERROR.USER_NOT_FOUND);
    const { spotifyAxios } = context;

    const data = await spotifyAxios.get(`/me/player/devices`);

    return data.devices.map(mapDevice);
  },
};
