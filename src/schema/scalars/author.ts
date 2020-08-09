const { gql } = require('apollo-server-express');

export const authorScalar = gql`
type Author {
  name: String
  books: [Book]
}
`
;
