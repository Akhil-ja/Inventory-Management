import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

connectDB(); //Connect DB

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
