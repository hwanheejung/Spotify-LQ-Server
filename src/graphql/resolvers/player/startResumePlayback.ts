import { ERROR } from "../../../lib/constants/error.js";
import { MyContext } from "../../context.js";

type StartResumePlaybackArgs = {
  deviceId: string;
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
export const startResumePlayback = async (
  _: unknown,
  args: StartResumePlaybackArgs,
  context: MyContext
) => {
  if (!context.isAuthenticated) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }
  const { spotifyAxios } = context;
  try {
    await spotifyAxios.put(`/me/player/play?device_id=${args.deviceId}`, {
      context_uri:
        args.type === "album" || args.type === "playlist"
          ? `spotify:${args.type}:${args.id}`
          : undefined,
      uris:
        args.type === "track" && Array.isArray(args.ids)
          ? args.ids.map((id) => `spotify:track:${id}`)
          : undefined,
      offset:
        args.type === "album" || args.type === "playlist"
          ? { position: args.offset?.position ?? 0 }
          : undefined,
    });

    return true;
  } catch (error) {
    console.error("Error on startResumePlayback", error);
    throw new Error("Failed to fetch startResumePlayback from Spotify API");
  }
};
