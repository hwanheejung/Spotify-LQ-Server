import { gql } from "graphql-tag";

export const artistTypeDefs = gql`
  type Artist {
    id: String!
    name: String
    type: String
    followers: Followers
    images: [Image]
    genres: [String]
  }

  type Followers {
    href: String
    total: Int
  }

  type Image {
    url: String!
    height: Int!
    width: Int!
  }

  type Query {
    artist(artistId: String!): Artist
  }
`;
