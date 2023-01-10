import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routerBooks from './routes/books.routes';
import routerExchanges from './routes/exchanges.routes';
import routerReader from './routes/readers.routes';

const app = express();
// app.use(cors({
//   origin: '*'
// }));
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json());
app.use(morgan('tiny'));
app.use(routerBooks);
app.use(routerReader);
app.use(routerExchanges);

export default app;