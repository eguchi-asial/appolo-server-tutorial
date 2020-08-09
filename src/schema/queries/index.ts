const { gql } = require('apollo-server-express');
export const query = gql`

type Query {
  books: [Book]
  authors: [Author]
  search(contains: String): [Result]
}

`;
