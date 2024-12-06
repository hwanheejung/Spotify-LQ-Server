import lyricsAxios from "../../utils/lyricsAxios.js";

export const CurrentTrack = {
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
};
