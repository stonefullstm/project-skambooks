import { Router } from 'express';
import readersController from '../controllers/readers.controller';
import { validateLogin, validateReader } from '../middleware';
import validateToken from '../middleware/validateToken';

const routerReader = Router();
routerReader.delete('/readers', validateToken, readersController.deleteReader);
routerReader.put('/readers', validateToken, readersController.updateReader);
routerReader.post('/readers', validateReader, readersController.createReader);
routerReader.get('/readers', validateToken, readersController.getReaderById);
routerReader.post('/login', validateLogin, readersController.getReaderByEmail);

export default routerReader;