import { ERROR } from "../../lib/constants/error.js";
import { MyContext } from "../context.js";
import lyricsAxios from "../utils/lyricsAxios.js";

type StartResumePlaybackInput = {
  deviceId: string;
  positionMs?: number;
} & (
  | {
      type: "album" | "playlist";
      id: string; // albumId or playlistId
      offset: { position: number };
    }
  | {
      type: "artist";
      id: string; // artistId
    }
  | {
      type: "track";
      ids: string[]; // trackIds
    }
);

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

const playerResolvers = {
  Query: {
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
  },
  CurrentTrack: {
    lyrics: async (parent: any) => {
      const lyricsParams = {
        track_name: parent.name,
        artist_name: parent.artists[0].name,
        album_name: parent.album.name,
        duration: Math.floor(parent.duration_ms / 1000),
      };

      const lyricsResponse = await lyricsAxios.get("/get", {
        params: lyricsParams,
      });

      if (!lyricsResponse) {
        return {
          available: false,
        };
      } else {
        const { id, plainLyrics, syncedLyrics } = lyricsResponse || {};

        return {
          available: true,
          locked: false,
          data: {
            id: id || null,
            plainLyrics: plainLyrics || "",
            syncedLyrics: syncedLyrics || "",
          },
        };
      }
    },
  },
  Mutation: {
    playbackTransfer: async (
      _: unknown,
      { deviceId }: { deviceId: string },
      context: MyContext
    ) => {
      if (!context.isAuthenticated) throw new Error(ERROR.USER_NOT_FOUND);
      const { spotifyAxios } = context;

      await spotifyAxios.put(`/me/player`, {
        device_ids: [deviceId],
        play: true,
      });

      return true;
    },
    startResumePlayback: async (
      _: unknown,
      { input }: { input: StartResumePlaybackInput },
      context: MyContext
    ) => {
      if (!context.isAuthenticated) throw new Error(ERROR.USER_NOT_FOUND);
      const { spotifyAxios } = context;

      await spotifyAxios.put(`/me/player/play?device_id=${input.deviceId}`, {
        position_ms: input.positionMs ?? 0,
        context_uri:
          input.type === "album" || input.type === "playlist"
            ? `spotify:${input.type}:${input.id}`
            : undefined,
        uris:
          input.type === "track" && Array.isArray(input.ids)
            ? input.ids.map((id) => `spotify:track:${id}`)
            : undefined,
        offset:
          input.type === "album" || input.type === "playlist"
            ? { position: input.offset?.position ?? 0 }
            : undefined,
      });

      return true;
    },
  },
};

export default playerResolvers;
