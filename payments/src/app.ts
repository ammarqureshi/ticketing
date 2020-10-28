import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@aqtickets/common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test'
    secure: false,
  })
);
//add middleware
//if user is authenticated, will set that req.currentUser
app.use(currentUser);
app.use(createChargeRouter);

//only POST and PUT to /api/tickets without authorization, throw error
// fine for GET requests to /api/tickets

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
