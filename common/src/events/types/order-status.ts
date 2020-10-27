export enum OrderStatus {
  //order for a ticked has been created but order has not been reserved
  Created = 'created',

  //when the order for ticket has already been reserved or when user has cancelled the order
  //or order expires before payment
  Cancelled = 'cancelled',

  //order has successfully reserved the ticket
  AwaitingPayment = 'awaiting: payment',

  //order has reserved the ticket and user has provided payment succesfully
  Complete = 'complete',
}
