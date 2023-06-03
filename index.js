/* Node modules */
require('dotenv').config();
/* MongoDB modules */
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
/* Apollo Server GraphQL modules */
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs, resolvers } = require('./graphql');

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server);

  console.log(`🚀 Server is now running on: ${url}`);
}

async function startMongoose() {
  mongoose
    // set up the conection string in the .env file
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log('✓ Connected to MongoDB.');
    })
    .catch((err) => {
      console.log(`✘ ${err}`);
    });
}

async function startServer() {
  startApolloServer();
  startMongoose();
}

startServer();
