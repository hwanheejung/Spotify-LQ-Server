import { gql } from "graphql-tag";

export const searchTypeDefs = gql`
  interface AlbumResultBase {
    id: String
    images: [Image]
  }

  interface ArtistResultBase {
    id: String
    name: String
  }

  type AlbumResult implements AlbumResultBase {
    id: String
    images: [Image]
    name: String
    album_type: String
    release_date: String
    artists: [ArtistResultBase]
  }

  type ArtistResult implements ArtistResultBase {
    id: String
    name: String
    type: String
  }

  type TrackResult {
    id: String
    name: String
    album: AlbumResultBase
    duration_ms: Int
    artists: [ArtistResultBase]
  }

  type SearchResult {
    albums: [AlbumResult]
    artists: [ArtistResult]
    tracks: [TrackResult]
  }

  type Query {
    search(query: String!): SearchResult
  }
`;
