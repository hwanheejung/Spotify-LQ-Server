import { ERROR } from "../../../lib/constants/error.js";
import throwError from "../../../lib/utils/throwError.js";
import { MyContext } from "../../context.js";
import lyricsAxios from "../../utils/lyricsAxios.js";

export const getQueue = async (_: unknown, {}, context: MyContext) => {
  if (!context.isAuthenticated) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }

  const { spotifyAxios } = context;
  try {
    const data = await spotifyAxios.get(`/me/player/queue`);
    const currently_playing = data.currently_playing;

    const lyricsParams = {
      track_name: currently_playing.name,
      artist_name: currently_playing.artists[0].name,
      album_name: currently_playing.album.name,
      duration: Math.floor(currently_playing.duration_ms / 1000),
    };

    let lyrics;
    try {
      const lyricsResponse = await lyricsAxios.get("/get", {
        params: lyricsParams,
      });

      if (!lyricsResponse) {
        lyrics = {
          available: false,
        };
      } else {
        const { id, plainLyrics, syncedLyrics } = lyricsResponse;

        lyrics = {
          available: true,
          locked: false,
          data: {
            id,
            plainLyrics,
            syncedLyrics,
          },
        };
      }
    } catch (error: any) {
      throwError(`Error fetching lyrics: ${error.message}`);
    }

    return {
      currently_playing: {
        ...currently_playing,
        lyrics,
      },
      queue: data.queue,
    };
  } catch (error: any) {
    throwError(`Error getting album tracks: ${error.message}`);
  }
};
