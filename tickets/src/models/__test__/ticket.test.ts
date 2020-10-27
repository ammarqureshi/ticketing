import { Ticket } from '../ticket';

//async(done) tells jest we are done with the test
it('implements OCC', async (done) => {
  //create instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  //save ticket to db
  await ticket.save();

  //fetch ticket twice - both will have the same versioning flag i.e v0
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //make two separate changes to ticket we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 20 });

  //save first fetch ticket    -- at this point the version flag has changed v1
  await firstInstance!.save();

  //save second fetched ticket and expect an error - find and update record v0 --> error

  try {
    await secondInstance!.save();
  } catch (error) {
    return done();
  }
  throw new Error('should not reach this point');
});

it('increments version number on saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
