import { ERROR } from "../../../lib/constants/error.js";
import throwError from "../../../lib/utils/throwError.js";
import { MyContext } from "../../context.js";

export const getAlbumTracks = async (
  _: unknown,
  { albumId }: { albumId: string },
  context: MyContext
) => {
  if (!context.isAuthenticated) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }

  const { spotifyAxios } = context;
  try {
    const data = await spotifyAxios.get(`/albums/${albumId}/tracks`);

    return {
      href: data.href || null,
      limit: data.limit || null,
      next: data.next || null,
      offset: data.offset || null,
      previous: data.previous || null,
      total: data.total || null,
      items: (data.items || []).map((track: any) => ({
        artists: (track.artists || []).map((artist: any) => ({
          external_urls: artist.external_urls || null,
          href: artist.href || null,
          id: artist.id || null,
          name: artist.name || null,
          type: artist.type || null,
          uri: artist.uri || null,
        })),
        available_markets: track.available_markets || [],
        disc_number: track.disc_number || null,
        duration_ms: track.duration_ms || null,
        explicit: track.explicit || null,
        external_urls: track.external_urls || null,
        href: track.href || null,
        id: track.id || null,
        is_playable: track.is_playable || null,
        linked_from: track.linked_from || null,
        restrictions: track.restrictions || null,
        name: track.name || null,
        preview_url: track.preview_url || null,
        track_number: track.track_number || null,
        type: track.type || null,
        uri: track.uri || null,
        is_local: track.is_local || null,
      })),
    };
  } catch (error: any) {
    throwError(`Error getting album tracks: ${error.message}`);
  }
};
