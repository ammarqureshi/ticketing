import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@aqtickets/common';
//validate incoming body request
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
const router = express.Router();
import { natsWrapper } from '../nats-wrapper';

router.post(
  '/api/tickets',
  requireAuth,
  [
    //doing this validation check alone doesn't cause any validation errors to be thrown
    //or a response to be sent back. Instead it will set an error on the incoming request.
    //we then have to inspect that request and respond to it, if required.
    //we have the middleware - validate-request that will check for any set errors in the request
    body('title').not().isEmpty().withMessage('Title is required'),

    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    console.log('title: ' + title);
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
