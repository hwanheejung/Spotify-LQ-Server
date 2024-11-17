import { getSavedAlbums } from "./getSavedAlbums.js";
import { getAlbumTracks } from "./getAlbumTracks.js";

export const albumsResolver = {
  Query: { getSavedAlbums, getAlbumTracks },
};
