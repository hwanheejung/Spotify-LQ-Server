import { ERROR } from "../../../lib/constants/error.js";
import { MyContext } from "../../context.js";

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

export const playerMutations = {
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
};
