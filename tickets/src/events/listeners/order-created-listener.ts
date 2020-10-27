import { Listener, OrderCreatedEvent, Subjects } from '@aqtickets/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TickedUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    //find ticket related to the order
    const ticket = await Ticket.findById(data.ticket.id);

    //if no ticket, then throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    //mark the ticket as being reserved by setting orderId property
    ticket.set({ orderId: data.id });

    //save ticket
    await ticket.save();
    await new TickedUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version
    });
    //ack the message
    msg.ack();
  }
}
