import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { config } from './config.js';
import router from './routes/routes.js';


const app = express();

app.set('port', config.app.port);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// routes
app.use('/api/v1', router);



export default app;