import connection from '../database/database.js';
import { validateTransaction } from '../schemas/transactionSchemas.js';

export async function transactions(req, res) {
  try {
    const result = await connection.query(
      `SELECT * FROM transactions 
      WHERE "userId" = $1 
      ORDER BY id ASC;`,
      [req.userId],
    );

    return res.status(200).send(result.rows);
  } catch (error) {
    return res.status(500);
  }
}

export async function newTransaction(req, res) {
  try {
    const { value, description } = req.body;

    if (validateTransaction.validate(req.body).error) { return res.status(400).send('Dados inválidos.'); }

    await connection.query(
      `INSERT INTO transactions
      ("userId", description, value)
      VALUES ($1, $2, $3);`,
      [req.userId, description, value],
    );

    return res.status(201).send({
      userId: req.userId,
      description,
      value,
    });
  } catch (error) {
    return res.status(500);
  }
}
