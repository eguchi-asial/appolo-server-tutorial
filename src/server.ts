import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schemas } from './schema';

const PORT = 4000;

const app = express();

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
  Result: {
    /**
     * HITした結果Objectのpropertyを見て、返すtypeを定義する
     * @param obj
     * @param context 
     * @param info 
     */
    __resolveType(obj, context, info) {
      if(obj.name){
        return 'Author';
      }

      if(obj.title){
        return 'Book';
      }
      return null;
    },
  },
  Query: {
    books: () => books,
    authors: () => authors,
    search: (_, { contains }) => {
      const foundBooks = books.filter(book => book.title.includes(contains))
      return foundBooks.length > 0 ? foundBooks : authors.filter(author => author.name.includes(contains))
    }
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

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)
