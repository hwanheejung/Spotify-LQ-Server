export const AlbumType = `
  type Album {
    id: String 
    name: String 
    type: String 
    album_type: String 
    total_tracks: Int 
    available_markets: [String] 
    external_urls: ExternalUrls 
    href: String 
    uri: String 
    release_date: String 
    release_date_precision: String 
    restrictions: Restrictions 
    images: [Image] 
    artists: [Artist] 
  }
`;
