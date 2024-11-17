export * from "./album.js";
export * from "./artist.js";
export * from "./track.js";

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
