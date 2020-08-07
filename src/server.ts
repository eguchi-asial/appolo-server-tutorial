const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const PORT = 4000;

const app = express();

const typeDefs = gql`
type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}

type Query {
  books: [Book]
  authors: [Author]
}

type Mutation {
  addBook(postBook: PostBookInput): Book
}

input PostBookInput {
  title: String
  author: String
}

`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: {
      name: 'J.K. Rowling'
    },
  },
  {
    title: 'Jurassic Park',
    author: {
      name: 'Michael Crichton'
    },
  }
];

const authors = [
  {
    name: 'J.K. Rowling',
    books: [{ title: 'Harry Potter and the Chamber of Secrets' }]
  },
  {
    name: 'Michael Crichton',
    books: [{ title: 'Jurassic Park' }]
  }
]

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors
  },
  Mutation: {
    addBook: (root, { postBook: { title, author } }) => {
      const added = {
        title,
        author: {
          name: author
        }
      };
      books.push(added);
      return added;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
