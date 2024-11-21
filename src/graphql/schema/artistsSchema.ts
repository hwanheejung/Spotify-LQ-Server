import { buildSchema } from "graphql";
import { ArtistType, ExternalUrlsType, ImageType } from "./common/index.js";

export const artistsSchema = buildSchema(`
    ${ArtistType}
    ${ImageType}
    ${ExternalUrlsType}

    type Followers {
        href: String
        total: Int
    }

    extend type Artist {
        followers: Followers
        genres: [String]
        images: [Image]
        popularity: Int
    }

    type Query {
        getArtist(artistId: String!): Artist
    }

`);
