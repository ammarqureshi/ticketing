import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@aqtickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  //save reference to ticket created - no need for sync communication with tickets
  //service in the future
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    //tell NATS we have received and successfully processed the message
    msg.ack();
  }
}
