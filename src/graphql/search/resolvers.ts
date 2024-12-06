import { ERROR } from "../../lib/constants/error.js";
import { MyContext } from "../context.js";

const mapAlbum = (album: any) => ({
  id: album.id,
  images: album.images,
  name: album.name,
  album_type: album.album_type,
  release_date: album.release_date,
  artists: album.artists.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
  })),
});

const mapArtist = (artist: any) => ({
  id: artist.id,
  name: artist.name,
  type: artist.type,
});

const mapTrack = (track: any) => ({
  id: track.id,
  name: track.name,
  album: {
    id: track.album.id,
    images: track.album.images,
  },
  duration_ms: track.duration_ms,
  artists: track.artists.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
  })),
});

const searchResolvers = {
  Query: {
    search: async (
      _: unknown,
      { query }: { query: string },
      context: MyContext
    ) => {
      if (!context.isAuthenticated) throw new Error(ERROR.USER_NOT_FOUND);
      const { spotifyAxios } = context;

      const searchResult = await spotifyAxios.get(
        `/search?q=${query}&type=album,artist,track`
      );

      return {
        albums: searchResult.albums.items.map(mapAlbum),
        artists: searchResult.artists.items.map(mapArtist),
        tracks: searchResult.tracks.items.map(mapTrack),
      };
    },
  },
};

export default searchResolvers;
