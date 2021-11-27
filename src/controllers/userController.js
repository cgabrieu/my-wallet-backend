import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import * as userSchemas from '../schemas/userSchemas.js';
import * as userService from '../services/userServices.js';

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (userSchemas.signIn.validate(req.body).error) {
      return res.status(400).send('Dados inválidos.');
    }

    const { token } = await userService.authenticate(email, password);

    if (token) {
      return res.status(200).send({ token });
    }

    return res.status(401).send('E-mail ou senha inválidos.');
  } catch (error) {
    return res.status(500);
  }
}

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;

    if (userSchemas.signUp.validate(req.body).error) {
      return res.status(400).send('Sua senha precisa ser mais forte.');
    }

    const hasUser = await connection.query(
      `SELECT * FROM users
      WHERE email = $1;`,
      [email],
    );
    if (hasUser.rowCount > 0) {
      return res.status(409).send('Usuário já existente.');
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await connection.query(
      `INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3);`,
      [name, email, hashPassword],
    );

    return res.status(201).send('Conta criada com sucesso.');
  } catch (error) {
    return res.status(500);
  }
}
