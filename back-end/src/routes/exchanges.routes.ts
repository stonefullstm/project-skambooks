import { Router } from "express";
import exchangesController from '../controllers/exchanges.controller';
import validateToken from '../middleware/validateToken';

const routerExchanges = Router();
routerExchanges.get('/exchanges', validateToken, exchangesController.getAllExchangesByReader);
routerExchanges.get('/exchanges/:id', validateToken, exchangesController.getExchangeById);
routerExchanges.post('/exchanges', validateToken, exchangesController.createExchange);
routerExchanges.put('/exchanges/:id', validateToken, exchangesController.confirmExchange);
routerExchanges.delete('/exchanges/:id', validateToken, exchangesController.deleteExchange);

export default routerExchanges;