export * from "./album.js";
export * from "./artist.js";
export * from "./track.js";
export * from "./lyrics.js";

export const ImageType = `
  type Image {
    url: String
    height: Int
    width: Int
  }
`;

export const RestrictionsType = `
  type Restrictions {
    reason: String
  }
`;

export const ExternalUrlsType = `
  type ExternalUrls {
    spotify: String
  }
`;

export const ExternalIdsType = `
  type ExternalIds {
    isrc: String
    ean: String
    upc: String
  }
`;

export const LinkedFromType = `
  type LinkedFrom {
    external_urls: ExternalUrls
    href: String 
    id: String
    type: String
    uri: String
  }
`;
