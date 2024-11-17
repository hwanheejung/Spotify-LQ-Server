import { buildSchema } from "graphql";

export const albumsGQLSchema = buildSchema(`
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

  type ExternalUrls {
    spotify: String
  }

  type Image {
    url: String
    height: Int
    width: Int
  }

  type Restrictions {
    reason: String
  }

  type Artist {
    external_urls: ExternalUrls
    href: String
    id: String
    name: String
    type: String
    uri: String
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

  type Track {
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
