import bcrypt from 'bcrypt';
import faker from 'faker/locale/pt_BR';
import connection from '../../src/database/database';

export default async function createUser() {
  const pass = faker.internet.password(12);
  const hash = bcrypt.hashSync(pass, 10);

  const newUser = await connection.query(
    `INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING email, password;`,
    [faker.name.findName(), faker.internet.email(), hash],
  );
  newUser.rows[0].password = pass;
  return newUser.rows[0];
}
