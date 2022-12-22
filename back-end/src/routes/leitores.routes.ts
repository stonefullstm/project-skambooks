import { Router } from "express";
import leitores from '../controllers/leitores.controller';

const routerLeitor = Router();
routerLeitor.delete('/leitores/:id', leitores.deleteLeitor);
routerLeitor.put('/leitores/:id', leitores.updateLeitor);
routerLeitor.post('/leitores', leitores.insertLeitor);
routerLeitor.get('/leitores/:id', leitores.getIdLeitor);
routerLeitor.post('/login', leitores.getLeitorByEmail);

export default routerLeitor;