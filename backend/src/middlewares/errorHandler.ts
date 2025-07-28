import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/HttpError.js';
import HttpStatus from '../utils/HttpStatus.js';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);

  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = HttpStatus.BAD_REQUEST;
    message = 'Invalid ID';
  } else if (err.name === 'ValidationError') {
    statusCode = HttpStatus.BAD_REQUEST;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export default errorHandler;
