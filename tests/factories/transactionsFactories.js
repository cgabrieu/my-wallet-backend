import faker from 'faker/locale/pt_BR';
import connection from '../../src/database/database.js';

export default async function createTransaction(userId) {
  const result = await connection.query(
    `INSERT INTO transactions
    ("userId", description, value)
    VALUES ($1, $2, $3)
    RETURNING id;`,
    [userId, faker.lorem.words(), faker.datatype.number()],
  );
  return result.rows[0].id;
}
