import gql from "graphql-tag";

export const Schema = gql`
  enum Sort {
    asc
    desc
  }

  input Paggination {
    take: Int
    skip: Int
  }

  interface Record {
    total: Int!
  }
`;
