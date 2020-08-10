import { gql } from 'apollo-server-express';

export const mutation = gql`

type Mutation {
  addBook(postBook: PostBookInput): Book
}

input PostBookInput {
  title: String
  author: String
}`
;
