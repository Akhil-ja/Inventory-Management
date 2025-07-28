import HttpStatus from './HttpStatus.js';

class HttpError extends Error {
  statusCode: HttpStatus;

  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError;
