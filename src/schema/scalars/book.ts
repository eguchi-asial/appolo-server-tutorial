import { gql } from 'apollo-server-express';

export const bookScalar = gql`

type Book {
  title: String
  author: Author
}
`

;
