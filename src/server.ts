import { ApolloServer } from 'apollo-server-express';
import fs from 'fs'
import path from 'path'
import { resolvers } from './schema/resolvers';

const typeDefs = fs.readFileSync(path.join(__dirname, './schema', 'scheme.graphql'), 'utf8').toString()

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default server