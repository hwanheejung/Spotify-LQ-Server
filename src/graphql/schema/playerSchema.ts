import { buildSchema } from "graphql";
import {
  AlbumType,
  ArtistType,
  ExternalIdsType,
  ExternalUrlsType,
  ImageType,
  LinkedFromType,
  LyricsType,
  RestrictionsType,
} from "./common/index.js";

const commonTrackFields = `
    album: Album
    artists: [Artist]
    available_markets: [String]
    disc_number: Int
    duration_ms: Int
    explicit: Boolean
    external_ids: ExternalIds
    external_urls: ExternalUrls
    href: String
    id: String
    is_playable: Boolean
    linked_from: LinkedFrom
    restrictions: Restrictions
    name: String
    popularity: Int
    preview_url: String
    track_number: Int
    type: String
    uri: String
    is_local: Boolean  
`;

export const playerSchema = buildSchema(`
    ${AlbumType}
    ${ArtistType}
    ${ExternalUrlsType}
    ${ExternalIdsType}
    ${RestrictionsType}
    ${ImageType}
    ${LinkedFromType}
    ${LyricsType}

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

    type Track {
        ${commonTrackFields}
    }

    type CurrentlyPlayingTrack {
        ${commonTrackFields}
        lyrics: Lyrics
    }

    type QueueResponse {
        currently_playing: CurrentlyPlayingTrack
        queue: [Track]
    }

    input OffsetInput {
        position: Int!
    }
    
    type Query {
        getAvailableDevices: [Device!]!
        getQueue: QueueResponse
    }

    type Mutation {
        transferPlayback(deviceId: String!): Boolean!
        startResumePlayback(
            deviceId: String!
            type: String!
            id: String 
            ids: [String] 
            offset: OffsetInput 
            positionMs: Int
          ): Boolean!
    }

`);
