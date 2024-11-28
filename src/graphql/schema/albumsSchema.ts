import { buildSchema } from "graphql";
import {
  AlbumType,
  ArtistType,
  ExternalUrlsType,
  ImageType,
  LinkedFromType,
  RestrictionsType,
  TrackType,
} from "./common/index.js";

export const albumsSchema = buildSchema(`
  ${TrackType}
  ${AlbumType}
  ${ArtistType}
  ${ImageType}
  ${RestrictionsType}
  ${ExternalUrlsType}
  ${LinkedFromType}


  type AlbumItem {
    added_at: String
    album: Album
  }

  extend type Album {
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

  type Copyright {
    text: String
    type: String
  }

  type ExternalIds {
    isrc: String
    ean: String
    upc: String
  }

  type TrackItem {
    artists: [Artist]
    available_markets: [String]
    disc_number: Int
    duration_ms: Int
    explicit: Boolean
    external_urls: ExternalUrls
    href: String
    id: String
    is_playable: Boolean
    linked_from: LinkedFrom
    restrictions: Restrictions
    name: String
    preview_url: String
    track_number: Int
    type: String
    uri: String
    is_local: Boolean
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

  type AlbumTracksResponse {
    href: String
    limit: Int
    next: String
    offset: Int
    previous: String
    total: Int
    items: [TrackItem]
  }

  type Query {
    getSavedAlbums(offset: Int = 0, limit: Int = 20): SavedAlbumsResponse
    getAlbumTracks(albumId: String!): AlbumTracksResponse
    getAlbum(albumId: String!): Album
  }
`);
