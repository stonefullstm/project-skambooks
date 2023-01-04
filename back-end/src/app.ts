import express from 'express';
import routerBooks from './routes/books.routes';
import routerExchanges from './routes/exchanges.routes';
import routerReader from './routes/readers.routes';
import cors from 'cors';


const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(routerBooks);
app.use(routerReader);
app.use(routerExchanges);

export default app;