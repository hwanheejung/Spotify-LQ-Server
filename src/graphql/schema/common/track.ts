export const TrackType = `
  type Track {
    id: String
    name: String
    href: String
    uri: String
    type: String
    duration_ms: Int
    explicit: Boolean
    preview_url: String
    popularity: Int
    track_number: Int
    disc_number: Int
    is_playable: Boolean
    is_local: Boolean
    external_urls: ExternalUrls
    restrictions: Restrictions
    album: Album
    artists: [Artist]
  }
`;
