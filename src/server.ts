import express from 'express';
import routes from './routes';
import './database';
import 'reflect-metadata';

const app = express();
app.use(express.json());

app.use(routes);

const PORT = '3333';
app.listen(PORT, () => console.log(`Running server in ${PORT}`));
