import express = require('express');
import http from 'http';
import cors from 'cors';
import * as Route from './src/route';

const app: express.Application = express();

export const App = app;

app.use(
    cors({
        origin: true,
        methods: 'GET,PUT,POST,DELETE',
        preflightContinue: true,
        optionsSuccessStatus: 204,
        credentials: true
    })
);

app.use('/api/session', Route.session);

const port = 9527;
const server = new http.Server(app);

server.listen(`${port}`, function() {
    console.log(`App listening on port ${port}!`);
});
