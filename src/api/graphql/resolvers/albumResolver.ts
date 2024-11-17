import axios from "axios";
import { IUser } from "../../../features/user/models/User";

export const albumResolver = {
  Query: {
    getSavedAlbums: async (
      _: unknown,
      { offset = 0, limit = 20 },
      { user }: { user: IUser }
    ) => {
      if (!user) {
        throw new Error("User not found");
      }

      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`,
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
          items: (data.items || []).map((item: any) => ({
            added_at: item.added_at || null,
            album: {
              album_type: item.album.album_type || null,
              total_tracks: item.album.total_tracks || null,
              available_markets: item.album.available_markets || [],
              external_urls: item.album.external_urls || null,
              href: item.album.href || null,
              id: item.album.id || null,
              images: item.album.images || [],
              name: item.album.name || null,
              release_date: item.album.release_date || null,
              release_date_precision: item.album.release_date_precision || null,
              restrictions: item.album.restrictions || null,
              type: item.album.type || null,
              uri: item.album.uri || null,
              artists: (item.album.artists || []).map((artist: any) => ({
                external_urls: artist.external_urls || null,
                href: artist.href || null,
                id: artist.id || null,
                name: artist.name || null,
                type: artist.type || null,
                uri: artist.uri || null,
              })),
              tracks: {
                href: item.album.tracks.href || null,
                limit: item.album.tracks.limit || null,
                next: item.album.tracks.next || null,
                offset: item.album.tracks.offset || null,
                previous: item.album.tracks.previous || null,
                total: item.album.tracks.total || null,
                items: (item.album.tracks.items || []).map((track: any) => ({
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
              copyrights: item.album.copyrights || [],
              external_ids: item.album.external_ids || null,
              genres: item.album.genres || [],
              label: item.album.label || null,
              popularity: item.album.popularity || null,
            },
          })),
        };
      } catch (error) {
        console.error("Error fetching albums:", error);
        throw new Error("Failed to fetch albums from Spotify API");
      }
    },
  },
};
