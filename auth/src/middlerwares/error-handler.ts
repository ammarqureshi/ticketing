import {Request, Response, NextFunction} from 'express';
import {RequestValidationError} from '../errors/request-validation-errors';
import {DatabaseConnectionError} from '../errors/database-connection-error';
import {CustomError} from '../errors/custom-errors';


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) =>{
  if(err instanceof CustomError){
    return res.status(err.statusCode).send({errors: err.serializeErrors()});
  }


  res.status(400).send({
    message: 'something went wrong'
  });
};