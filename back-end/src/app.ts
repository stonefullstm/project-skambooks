import express from 'express';
import routerLivros from './routes/livros.routes';

const app = express();

app.use(express.json());
app.use(routerLivros);

export default app;