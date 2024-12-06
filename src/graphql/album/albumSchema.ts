import { gql } from "graphql-tag";

export const albumTypeDefs = gql`
  type Album {
    id: String!
    name: String!
    album_type: String
    total_tracks: Int
    images: [Image!]
    type: String
    release_date: String
    uri: String
    artists: [Artist!]
    tracks: [Track!]!
    copyrights: [Copyright]
    label: String
  }

  type Track {
    artists: [Artist]
    id: String
    name: String
    type: String
    duration_ms: Int
    track_number: Int
    disc_number: Int
    is_playable: Boolean
    is_local: Boolean
  }

  type Artist {
    id: String
    name: String
    type: String
    uri: String
  }

  type SavedAlbum {
    added_at: String
    album: Album
  }

  type Image {
    url: String!
    height: Int!
    width: Int!
  }

  type Copyright {
    text: String
    type: String
  }

  type Query {
    album(albumId: String!): Album
    savedAlbums(offset: Int = 0, limit: Int = 20): [SavedAlbum]
  }
`;
