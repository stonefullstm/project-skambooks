import { Router } from "express";
import readersController from '../controllers/readers.controller';
import validateToken from "../middleware/validateToken";

const routerReader = Router();
routerReader.delete('/readers/:id', readersController.deleteReader);
routerReader.put('/readers/', validateToken, readersController.updateReader);
routerReader.post('/readers', readersController.createReader);
routerReader.get('/readers/:id', readersController.getReaderById);
routerReader.post('/login', readersController.getReaderByEmail);

export default routerReader;