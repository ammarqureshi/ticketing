import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}
jest.mock('../nats-wrapper');
process.env.STRIPE_KEY =
  'sk_test_51HgentIOyZqsIU0xZ1CH5p0aZn9khQ1ruL4cKURMIgmjPJQLeMFyyQeVIfbtd9may6vXW1iPgIyjBL4YdDYDYOpE00qxZgM5nK';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

//will make up our own cookie for api/tickets
global.signin = (id?: string) => {
  //build a JWT payload {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  //create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session object {jwt: MY_JWT}
  const session = { jwt: token };

  //turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  //take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return a string - will be the cookie with encoded
  //[] for supertest
  return [`express:sess=${base64}`];
};
