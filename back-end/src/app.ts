import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routerBooks from './routes/books.routes';
import routerExchanges from './routes/exchanges.routes';
import routerReader from './routes/readers.routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use(routerBooks);
app.use(routerReader);
app.use(routerExchanges);

export default app;