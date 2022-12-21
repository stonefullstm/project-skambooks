import { Router } from "express";
import leitores from '../controllers/leitores.controller';

const routerLeitor = Router();
routerLeitor.get('/leitores/:id', leitores.getIdLeitor);
routerLeitor.post('/login', leitores.getLeitorByEmail);

export default routerLeitor;