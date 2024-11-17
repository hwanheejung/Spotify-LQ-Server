import axios from "axios";
import { ERROR } from "../../../lib/constants/error.js";
import { SPOTIFY_BASE } from "../../../lib/constants/spotify.js";
import { IUser } from "../../../models/User.js";

export const getAlbumTracks = async (
  _: unknown,
  { albumId }: { albumId: string },
  { user }: { user: IUser }
) => {
  if (!user) {
    throw new Error(ERROR.USER_NOT_FOUND);
  }

  try {
    const response = await axios.get(
      `${SPOTIFY_BASE}/v1/albums/${albumId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${user.spotifyToken.accessToken}`,
        },
      }
    );

    const data = response.data;

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
  } catch (error) {
    console.error("Error getting album tracks", error);
    throw new Error("Failed to fetch album tracks from Spotify API");
  }
};
