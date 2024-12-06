import { gql } from "graphql-tag";

export const playerTypeDefs = gql`
  type Player {
    currentTrack: CurrentTrack
    queue: [Track]!
  }

  type CurrentTrack {
    id: String
    name: String
    album: Album
    artists: [Artist]
    duration_ms: Int
    lyrics: Lyrics
  }

  type Album {
    id: String
    name: String
    images: [Image]
  }

  type Track {
    id: String
    name: String
    album: Album
    artists: [Artist!]
    duration_ms: Int
  }

  type Artist {
    id: String
    name: String
  }

  type Lyrics {
    available: Boolean!
    locked: Boolean
    data: LyricsData
  }

  type LyricsData {
    id: String
    plainLyrics: String
    syncedLyrics: String
  }

  type Device {
    id: String
    is_active: Boolean
    is_private_session: Boolean
    is_restricted: Boolean
    name: String
    type: String
    volume_percent: Int
    supports_volume: Boolean
  }

  type Image {
    url: String
  }

  input StartResumePlaybackInput {
    deviceId: String!
    type: String!
    id: String
    ids: [String]
    offset: OffsetInput
    positionMs: Int
  }

  input OffsetInput {
    position: Int
  }

  type Query {
    player: Player
    availableDevices: [Device]!
  }

  type Mutation {
    playbackTransfer(deviceId: String!): Boolean
    startResumePlayback(input: StartResumePlaybackInput!): Boolean!
  }
`;
