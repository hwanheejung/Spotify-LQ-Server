import { getSavedAlbums } from "./getSavedAlbums.js";
import { getAlbumTracks } from "./getAlbumTracks.js";
import { getAlbum } from "./getAlbum.js";

export const albumsResolver = {
  Query: { getSavedAlbums, getAlbumTracks, getAlbum },
};
