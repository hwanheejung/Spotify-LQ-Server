import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  type Image {
    url: String
    height: Int
    width: Int
  }

  type Followers {
    href: String
    total: Int
  }
`;
