import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import {User} from '../models/user';

import {validateRequest} from '../middlerwares/validate-request';
import {RequestValidationError} from '../errors/request-validation-errors';
import {DatabaseConnectionError} from '../errors/database-connection-error';
import {BadRequestError} from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
async (req: Request, res: Response) => {

    const{email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
         console.log('email in use');
        //  return res.send({});
        throw new BadRequestError('Email in use');
    }

    const user = User.build({email, password});
    await user.save();

    //generate jwt
    const userJWT = jwt.sign({
        id: user.id,
        email: user.email
    },
        process.env.JWT_KEY!

    );

    //store it on the session object
    req.session = {
        jwt: userJWT
    };

    res.status(201).send(user);
});

export {router as signupRouter};