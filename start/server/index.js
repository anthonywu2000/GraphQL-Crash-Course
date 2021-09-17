const { ApolloServer } = require('apollo-server');
const { mainCards, animals, categories } = require('./db')
const typeDefs = require('./schema')
const Query = require("./resolvers/Query")
const Animal = require("./resolvers/Animal")
const Category = require("./resolvers/Category")
const Mutation = require("./resolvers/Mutation")

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Animal,
        Category,
        Mutation,
    },
    context: {
        mainCards,
        animals,
        categories,
    }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});