import { Router } from "express";
import exchangesController from '../controllers/exchanges.controller';
import validateToken from '../middleware/validateToken';

const routerExchanges = Router();
routerExchanges.get('/exchanges', exchangesController.getAllExchanges);
routerExchanges.post('/exchanges', validateToken, exchangesController.createExchange);

export default routerExchanges;