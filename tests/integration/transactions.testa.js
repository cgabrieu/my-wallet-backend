/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import app from '../../src/app.js';
import connection from '../../src/database/database.js';
import clearDatabase from '../utils/database.js';

const request = supertest(app);

const signUpRoute = '/transactions';

afterAll(async () => {
  clearDatabase();
  connection.end();
});

beforeEach(clearDatabase);

describe('POST /transactions', () => {
  it('returns status 201 for transaction creation', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: `${faker.internet.password(12)}@123`,
    };
    const result = await request.post(signUpRoute).send(body);
    expect(result.status).toEqual(201);
  });
});
