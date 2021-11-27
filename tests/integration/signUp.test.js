/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import jwt from 'jsonwebtoken';
import app from '../../src/app.js';
import connection from '../../src/database/database.js';
import clearDatabase from '../utils/database.js';
import createUser from '../factories/userFactories.js';

const request = supertest(app);

const signUpRoute = '/auth/sign-up';

afterAll(async () => {
  clearDatabase();
  connection.end();
});

beforeEach(clearDatabase);

describe('POST /auth/sign-up', () => {
  it('returns status 201 for valid inputs', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: `${faker.internet.password(12)}@123`,
    };
    const result = await request.post(signUpRoute).send(body);
    expect(result.status).toEqual(201);
  });

  it('returns status 400 for invalid name', async () => {
    const body = {
      name: faker.datatype.number(2),
      email: faker.internet.email(),
      password: faker.internet.password(8),
    };
    const result = await request.post(signUpRoute).send(body);
    expect(result.status).toEqual(400);
  });

  it('returns status 400 for invalid email', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.name.findName(),
      password: faker.internet.password(8),
    };
    const result = await request.post(signUpRoute).send(body);
    expect(result.status).toEqual(400);
  });

  it('returns status 400 for empty email', async () => {
    const body = {
      name: faker.name.findName(),
      email: '',
      password: faker.internet.password(8),
    };
    const result = await request.post(signUpRoute).send(body);
    expect(result.status).toEqual(400);
  });

  it('returns status 400 for invalid password', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(5),
    };
    const result = await request.post(signUpRoute).send(body);
    expect(result.status).toEqual(400);
  });
});
