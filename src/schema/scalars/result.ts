import { gql } from 'apollo-server-express';

export const resultUnion = gql`

union Result = Book | Author

`
;
