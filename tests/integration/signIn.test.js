/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';
import connection from '../../src/database/database.js';
import clearDatabase from '../utils/database.js';
import createUser from '../factories/userFactories.js';

const request = supertest(app);

const signInRoute = '/auth/sign-in';

afterAll(() => {
  connection.end();
});

beforeEach(clearDatabase);

describe('POST /auth/sign-in', () => {
  it('returns status 200 for valid access', async () => {
    const newUser = await createUser();

    const bodyData = {
      email: newUser.email,
      password: newUser.password,
    };

    const result = await request.post(signInRoute).send(bodyData);
    expect(result.status).toEqual(200);
  });

  it('returns status 400 for invalid format properties', async () => {
    const bodyData = {};
    const result = await request.post(signInRoute).send(bodyData);
    expect(result.status).toEqual(400);
  });

  it('returns status 401 for invalid password', async () => {
    const newUser = await createUser();

    const bodyData = {
      email: newUser.email,
      password: `${newUser.password}WRONG`,
    };

    const result = await request.post(signInRoute).send(bodyData);

    expect(result.status).toEqual(401);
  });

  it('returns status 401 for invalid email', async () => {
    const bodyData = {
      email: 'qualquercoisa@email.com',
      password: 'SenhaQuePassaNoTesteDeForça@123',
    };

    const result = await request.post(signInRoute).send(bodyData);

    expect(result.status).toEqual(401);
  });

  it('creates a session for valid access', async () => {
    const newUser = await createUser();

    const bodyData = {
      email: newUser.email,
      password: newUser.password,
    };

    const sessions = await connection.query('SELECT * FROM sessions');
    expect(sessions.rows.length).toEqual(0);

    await request.post('/auth/sign-in').send(bodyData);

    const newSessions = await connection.query('SELECT * FROM sessions;');
    expect(newSessions.rows.length).toEqual(1);
  });

  it('returns a token for valid access', async () => {
    const newUser = await createUser();
    const bodyData = {
      email: newUser.email,
      password: newUser.password,
    };

    const { body } = await request.post(signInRoute).send(bodyData);

    const lastSession = await connection.query(
      'SELECT * FROM sessions ORDER BY id DESC LIMIT 1;',
    );

    const { token } = lastSession.rows[0];
    expect(body.token).toEqual(token);
  });
});
