import connection from '../../src/database/database';

export default async function clearDatabase() {
  await connection.query('TRUNCATE users, sessions, transactions CASCADE;');
}
