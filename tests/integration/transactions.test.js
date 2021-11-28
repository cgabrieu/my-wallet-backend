/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app.js';
import connection from '../../src/database/database.js';
import clearDatabase from '../utils/database.js';
import * as userFactories from '../factories/userFactories.js';
import createTransaction from '../factories/transactionsFactories.js';

const request = supertest(app);

const transactionsRoute = '/transactions';

const validBody = {
  value: faker.datatype.number({
    min: -999,
    max: 999,
  }),
  description: faker.commerce.productAdjective(),
};

afterAll(async () => {
  await clearDatabase();
  connection.end();
});

beforeEach(clearDatabase);

describe('POST /transactions', () => {
  it('returns status 201 for transaction creation', async () => {
    const { token } = await userFactories.createToken();

    const result = await request
      .post(transactionsRoute)
      .set('Authorization', `Bearer ${token}`)
      .send(validBody);
    expect(result.status).toEqual(201);
  });

  it('returns status 400 for invalid body', async () => {
    const { token } = await userFactories.createToken();
    const body = {
      value: faker.commerce.productMaterial(),
      description: faker.commerce.productAdjective(),
    };

    const result = await request
      .post(transactionsRoute)
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(400);
  });

  it('returns status 400 empty body', async () => {
    const { token } = await userFactories.createToken();
    const body = {};

    const result = await request
      .post(transactionsRoute)
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(400);
  });

  it('returns status 400 invalid description', async () => {
    const { token } = await userFactories.createToken();
    const body = {
      value: faker.datatype.number({
        min: -999,
        max: 999,
      }),
      description: faker.lorem.paragraph(),
    };

    const result = await request
      .post(transactionsRoute)
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(400);
  });
});

describe('GET /transactions', () => {
  it('returns status 200 for valid header token', async () => {
    const { token } = await userFactories.createToken();

    const result = await request
      .get(transactionsRoute)
      .set('Authorization', `Bearer ${token}`)
      .send(validBody);
    expect(result.status).toEqual(200);
  });

  it('returns status 400 for invalid header token', async () => {
    const result = await request
      .get(transactionsRoute)
      .set('Authorization', `Bearer ${faker.lorem.sentence()}`)
      .send(validBody);
    expect(result.status).toEqual(401);
  });
});

describe('DELETE /transactions', () => {
  it('returns status 200 for valid param', async () => {
    const { userId, token } = await userFactories.createToken();

    const transactionId = await createTransaction(userId);

    const result = await request
      .delete(`${transactionsRoute}/${transactionId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });
});
