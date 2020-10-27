import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload{
  id: string;
  email: string;
}

//make modification inside existing type definition
declare global{
  //inside of express project
  namespace Express{
    //find Request
    interface Request{
      //and add an optional arg
      currentUser?: UserPayload;
    }
  }
}

//since not error handling middleware, will take three params
//extract JWT payload and set it
export const currentUser = (req: Request, res:Response, next:NextFunction) =>{
  if(!req.session?.jwt){
    return next();
  }

  try{
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    //append verified JWT to Request
    req.currentUser = payload;
  }
  catch(err){

  }
  //move onto the next middleware
  next();
};