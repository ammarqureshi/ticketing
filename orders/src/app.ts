import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@aqtickets/common';
import { deleteOrderRouter } from './routes/delete';
import { showOrderRouter } from './routes/show';
import { newOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes/index';

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

//wire the routers
app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

//only POST and PUT to /api/tickets without authorization, throw error
// fine for GET requests to /api/tickets

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
