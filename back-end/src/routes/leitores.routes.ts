import { Router } from "express";
import leitores from '../controllers/leitores.controller';

const routerLeitor = Router();
routerLeitor.post('/leitores', leitores.insertLeitor);
routerLeitor.get('/leitores/:id', leitores.getIdLeitor);

export default routerLeitor;