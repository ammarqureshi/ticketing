import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError} from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) =>{
  if(!req.currentUser){
    throw new NotAuthorizedError();
  }

  //move onto the next middleware or possibly the next routing handler function
  next();
}