import express, { Request, Response } from 'express';
import { requireAuth } from '@aqtickets/common';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send(order);
});

export { router as indexOrderRouter };
