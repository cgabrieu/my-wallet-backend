/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';
import jwt from 'jsonwebtoken';
import app from '../../src/app.js';
import connection from '../../src/database/database.js';
import clearDatabase from '../utils/database.js';
import * as userFactories from '../factories/userFactories.js';

const request = supertest(app);

const signInRoute = '/auth/sign-in';

afterAll(() => {
  connection.end();
});

beforeEach(clearDatabase);

describe('POST /auth/sign-in', () => {
  it('returns status 200 for valid access', async () => {
    const newUser = await userFactories.createUser();
    delete newUser.id;

    const result = await request.post(signInRoute).send(newUser);
    expect(result.status).toEqual(200);
  });

  it('returns status 400 for invalid format properties', async () => {
    const bodyData = {};
    const result = await request.post(signInRoute).send(bodyData);
    expect(result.status).toEqual(400);
  });

  it('returns status 401 for invalid password', async () => {
    const newUser = await userFactories.createUser();

    const bodyData = {
      email: newUser.email,
      password: `${newUser.password}WRONG`,
    };

    const result = await request.post(signInRoute).send(bodyData);

    expect(result.status).toEqual(401);
  });

  it('returns status 401 for invalid email', async () => {
    const bodyData = {
      email: faker.internet.email(),
      password: 'SenhaQuePassaNoTesteDeForça@123',
    };

    const result = await request.post(signInRoute).send(bodyData);

    expect(result.status).toEqual(401);
  });

  it('creates a session for valid access', async () => {
    const newUser = await userFactories.createUser();

    const bodyData = {
      email: newUser.email,
      password: newUser.password,
    };

    const sessions = await connection.query('SELECT * FROM sessions');
    expect(sessions.rows.length).toEqual(0);

    await request.post(signInRoute).send(bodyData);

    const newSessions = await connection.query('SELECT * FROM sessions;');
    expect(newSessions.rows.length).toEqual(1);
  });

  it('returns a valid jwt token for valid access', async () => {
    const newUser = await userFactories.createUser();
    delete newUser.id;

    const { body } = await request.post(signInRoute).send(newUser);

    const sessions = await connection.query('SELECT * FROM sessions;');
    const { userId } = sessions.rows[0];

    jwt.verify(body.token, process.env.JWT_SECRET, (err, decoded) => {
      expect(decoded.userId).toEqual(userId);
    });
  });
});
