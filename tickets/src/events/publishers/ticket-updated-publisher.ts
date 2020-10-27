import { Publisher, Subjects, TicketUpdatedEvent } from '@aqtickets/common';

export class TickedUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TickedUpdated = Subjects.TickedUpdated;
}
