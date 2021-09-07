const { ApolloServer, gql } = require('apollo-server');
const { mainCards, animals, categories } = require('./db');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// ! == means has to be that type
// Query argument (the slug argument endpoint) => retrieve the individual animal data
const typeDefs = gql`
  type MainCard {
     title: String!
     image: String!
  }
  
  type Animal {
     id: ID!
     image: String!
     title: String!
     rating: Float
     price: String!
     description: [String!]!
     slug: String!
     stock: Int!
     onSale: Boolean
  }
  
  type Category {
     id: ID!
     image: String!
     category: String!
     slug: String!
  }
  
  type Query {
    mainCards: [MainCard]
    animals: [Animal!]!
    animal(slug: String!): Animal
    categories: [Category!]!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        mainCards: () => mainCards,
        animals: () => animals,
        animal: (parent, args, ctx) => {
            let animal = animals.find((animal) => { // for everything in the animal array, check if the slug is equal to the input args' slug
                return animal.slug === args.slug
            })
            return animal
        },
        categories: () => categories,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});