import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  //get only the tickets that doesn't have an order associated with it
  const tickets = await Ticket.find({
    orderId: undefined,
  });

  res.send(tickets);
});

export { router as indexTicketRouter };
