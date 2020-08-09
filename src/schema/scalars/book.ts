const { gql } = require('apollo-server-express');

export const bookScalar = gql`
type Book {
  title: String
  author: Author
}
`
;
