import { Router } from "express";
import livrosController from '../controllers/livros.controller';

const routerLivros = Router();

routerLivros.get('/livros', livrosController.getAll);

export default routerLivros;