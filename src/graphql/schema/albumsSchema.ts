import { buildSchema } from "graphql";
import {
  ArtistType,
  ExternalUrlsType,
  ImageType,
  RestrictionsType,
  TrackType,
} from "./common/index.js";

export const albumsSchema = buildSchema(`
  ${TrackType}
  ${ArtistType}
  ${ImageType}
  ${RestrictionsType}
  ${ExternalUrlsType}

  type AlbumItem {
    added_at: String
    album: Album
  }

  type Album {
    album_type: String
    total_tracks: Int
    available_markets: [String]
    external_urls: ExternalUrls
    href: String
    id: String  
    images: [Image]
    name: String
    release_date: String
    release_date_precision: String
    restrictions: Restrictions
    type: String
    uri: String
    artists: [Artist]
    tracks: Tracks
    copyrights: [Copyright]
    external_ids: ExternalIds
    genres: [String]
    label: String
    popularity: Int
  }

  type Tracks {
    href: String
    limit: Int
    next: String
    offset: Int
    previous: String
    total: Int
    items: [Track]
  }


  type LinkedFrom {
    external_urls: ExternalUrls
    href: String
    id: String
    type: String
    uri: String
  }

  type Copyright {
    text: String
    type: String
  }

  type ExternalIds {
    isrc: String
    ean: String
    upc: String
  }

  type SavedAlbumsResponse {
    href: String
    limit: Int
    next: String
    offset: Int
    previous: String
    total: Int
    items: [AlbumItem]
  }

  type Query {
    getSavedAlbums(offset: Int = 0, limit: Int = 20): SavedAlbumsResponse
  }
`);
