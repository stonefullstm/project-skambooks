import express from 'express';
import routerBooks from './routes/books.routes';
import routerReader from './routes/readers.routes';

const app = express();

app.use(express.json());
app.use(routerBooks);
app.use(routerReader);

export default app;