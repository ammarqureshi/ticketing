import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@aqtickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
