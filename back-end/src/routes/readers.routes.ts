import { Router } from "express";
import readersController from '../controllers/readers.controller';

const routerReader = Router();
routerReader.delete('/readers/:id', readersController.deleteReader);
routerReader.put('/readers/:id', readersController.updateReader);
routerReader.post('/readers', readersController.insertReader);
routerReader.get('/readers/:id', readersController.getReaderById);
routerReader.post('/login', readersController.getReaderByEmail);

export default routerReader;