import { ERROR } from "../../../lib/constants/error.js";
import throwError from "../../../lib/utils/throwError.js";
import { MyContext } from "../../context.js";

export const getAlbum = async (
  _: unknown,
  { albumId }: { albumId: string },
  context: MyContext
) => {
  if (!context.isAuthenticated) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }
  const { spotifyAxios } = context;
  try {
    const data = await spotifyAxios?.get(`/albums/${albumId}`);
    return {
      album_type: data.album_type || null,
      total_tracks: data.total_tracks || null,
      available_markets: data.available_markets || [],
      external_urls: data.external_urls || null,
      href: data.href || null,
      id: data.id || null,
      images: data.images || [],
      name: data.name || null,
      release_date: data.release_date || null,
      release_date_precision: data.release_date_precision || null,
      restrictions: data.restrictions || null,
      type: data.type || null,
      uri: data.uri || null,
      artists: (data.artists || []).map((artist: any) => ({
        external_urls: artist.external_urls || null,
        href: artist.href || null,
        id: artist.id || null,
        name: artist.name || null,
        type: artist.type || null,
        uri: artist.uri || null,
      })),
      tracks: {
        href: data.tracks.href || null,
        limit: data.tracks.limit || null,
        next: data.tracks.next || null,
        offset: data.tracks.offset || null,
        previous: data.tracks.previous || null,
        total: data.tracks.total || null,
        items: (data.tracks.items || []).map((track: any) => ({
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
      },
      copyrights: data.copyrights || [],
      external_ids: data.external_ids || null,
      genres: data.genres || [],
      label: data.label || null,
      popularity: data.popularity || null,
    };
  } catch (error: any) {
    throwError(`Error getting album tracks: ${error.message}`);
  }
};
