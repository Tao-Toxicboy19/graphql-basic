import express from 'express';
import server from './server';

const app = express();

async function startServer() {
    await server.start();

    server.applyMiddleware({ app });
    app.setMaxListeners(15);

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer()