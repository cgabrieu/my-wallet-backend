/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

export async function create(user) {
  const result = await connection.query(
    'INSERT INTO sessions ("userId") VALUES ($1) RETURNING *',
    [user.id],
  );

  return result.rows[0];
}
