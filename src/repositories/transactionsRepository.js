/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

export async function select(userId) {
  const result = await connection.query(
    `SELECT * FROM transactions 
    WHERE "userId" = $1 
    ORDER BY id ASC;`,
    [userId],
  );
  return result.rows;
}

export async function add(userId, description, value) {
  await connection.query(
    `INSERT INTO transactions
    ("userId", description, value)
    VALUES ($1, $2, $3);`,
    [userId, description, value],
  );
}

export async function remove(transactionId) {
  const result = await connection.query(
    `DELETE FROM transactions
    WHERE id = $1;`,
    [transactionId],
  );
  return (result.rowCount > 0);
}
