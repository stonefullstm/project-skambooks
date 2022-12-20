import express from 'express';
import livrosController from './controllers/livros.controller';

const app = express();

app.use(express.json());
app.get('/livros', livrosController.getAll);

export default app;