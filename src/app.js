import express from 'express';
import dotenv from 'dotenv';
import configure from './controllers';
import { processRequest, handleError } from './middlewares/index';
import { infoLogger, errorLogger } from './logger';

dotenv.config({ path: './config/config.env' });
const uri = process.env.MONGO_URI;
const app = express();
app.use(express.json());
app.use(processRequest);

if (process.env.NODE_ENV !== 'TEST') {
  app.use(infoLogger);
}

configure(app);

if (process.env.NODE_ENV !== 'TEST') {
  app.use(errorLogger(uri));
}

app.use(handleError);
export default app;
