import { Router } from "express";
import livrosController from '../controllers/livros.controller';

const routerLivros = Router();
routerLivros.delete('/livros/:id', livrosController.deleteLivro);
routerLivros.get('/livros', livrosController.getAll);

export default routerLivros;