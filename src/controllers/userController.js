import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import * as userSchemas from '../schemas/userSchemas.js';
import * as userService from '../services/userServices.js';

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (userSchemas.signIn.validate(req.body).error) {
      return res.sendStatus(400);
    }

    const token = await userService.authenticate(email, password);
    if (token) {
      return res.status(200).send({ token });
    }

    return res.sendStatus(401);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    if (userSchemas.signUp.validate(req.body).error) {
      return res.sendStatus(400);
    }

    const hasUser = await connection.query(
      `SELECT * FROM users
      WHERE email = $1;`,
      [email],
    );
    if (hasUser.rowCount > 0) {
      return res.sendStatus(409);
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await connection.query(
      `INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3);`,
      [name, email, hashPassword],
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500);
  }
}
