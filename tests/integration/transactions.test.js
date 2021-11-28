/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app.js';
import connection from '../../src/database/database.js';
import clearDatabase from '../utils/database.js';
import * as userFactories from '../factories/userFactories.js';

const request = supertest(app);

const transactionsRoute = '/transactions';

afterAll(async () => {
  clearDatabase();
  connection.end();
});

beforeEach(clearDatabase);

describe('POST /transactions', () => {
  it('returns status 201 for transaction creation', async () => {
    const token = await userFactories.createToken();

    const body = {
      value: faker.datatype.number({
        min: 0,
        max: 999999,
      }),
      description: faker.commerce.productAdjective(),
    };

    const result = await request
      .post(transactionsRoute)
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(201);
  });

  it('returns status 400 for invalid body', async () => {
    const token = await userFactories.createToken();
    console.log(faker.datatype.number({
      min: -100,
      max: 0,
    }));
    let body = {
      value: faker.datatype.number({
        min: -100,
        max: 0,
      }),
      description: faker.commerce.productAdjective(),
    };

    let result = await request
      .post(transactionsRoute)
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(201);

    body = {
      value: faker.datatype.number({
        min: 0,
        max: 999999,
      }),
      description: faker.commerce.productAdjective(),
    };

    result = await request
      .post(transactionsRoute)
      .set('Authorization', `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(201);
  });
});
