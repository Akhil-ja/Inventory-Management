import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
// import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

connectDB(); //Connect DB

// app.use('/', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
