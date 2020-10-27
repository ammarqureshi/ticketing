import {ValidationError} from 'express-validator';
import {CustomError} from './custom-errors';


export class RequestValidationError extends CustomError{
  statusCode = 400;

  constructor(public errors: ValidationError[]){
    super('error validating');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(){
    return this.errors.map(err =>{
      console.log(err.msg); 
      return { message: err.msg, field: err.param};
    });
  }
}