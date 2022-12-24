import { Router } from "express";
import readersController from '../controllers/readers.controller';

const routerReader = Router();
routerReader.delete('/leitores/:id', readersController.deleteReader);
routerReader.put('/leitores/:id', readersController.updateReader);
routerReader.post('/leitores', readersController.insertReader);
routerReader.get('/leitores/:id', readersController.getReaderById);
routerReader.post('/login', readersController.getReaderByEmail);

export default routerReader;