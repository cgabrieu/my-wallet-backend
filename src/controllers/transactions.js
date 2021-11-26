import connection from '../database/database.js';

export default async function getTransactions(req, res) {
  try {
    const authorization = req.header('authorization');
    const token = authorization?.replace('Bearer ', '');

    const session = await connection.query(
      `
            SELECT "userId" FROM sessions
            WHERE token = $1;`,
      [token],
    );

    if (session.rowCount === 0) {
      return res.status(401).send('Você foi desconectado.');
    }

    const { userId } = session.rows[0];
    const result = await connection.query(
      `
            SELECT * FROM transactions 
            WHERE "userId" = $1 
            ORDER BY id ASC;`,
      [userId],
    );

    return res.status(200).send(result.rows);
  } catch (error) {
    return res.status(500);
  }
}
