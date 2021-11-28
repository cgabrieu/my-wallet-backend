import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import faker from 'faker/locale/pt_BR';
import connection from '../../src/database/database.js';

export async function createUser() {
  const pass = `${faker.internet.password(12)}@123`;
  const hash = bcrypt.hashSync(pass, 10);

  const newUser = await connection.query(
    `INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id, email, password;`,
    [faker.name.findName(), faker.internet.email(), hash],
  );
  newUser.rows[0].password = pass;
  return newUser.rows[0];
}

export async function createToken() {
  const { id: userId } = await createUser();

  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 },
  );

  return token;
}
