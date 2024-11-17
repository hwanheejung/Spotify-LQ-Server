import { buildSchema } from "graphql";

export const userGQLSchema = buildSchema(`
  type ExplicitContent {
    filter_enabled: Boolean!
    filter_locked: Boolean!
  }

  type ExternalUrls {
    spotify: String!
  }

  type Followers {
    href: String
    total: Int!
  }

  type Image {
    url: String!
    height: Int
    width: Int
  }

  type SpotifyUser {
    country: String!
    display_name: String!
    email: String!
    explicit_content: ExplicitContent!
    external_urls: ExternalUrls!
    followers: Followers!
    href: String!
    id: String!
    images: [Image!]!
    product: String!
    type: String!
    uri: String!
  }

  type Query {
    getUserInfo: SpotifyUser!
  }
`);
