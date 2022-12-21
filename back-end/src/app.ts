import express from 'express';
import routerLivros from './routes/livros.routes';
import routerLeitor from './routes/leitores.routes';

const app = express();

app.use(express.json());
app.use(routerLivros);
app.use(routerLeitor);

export default app;