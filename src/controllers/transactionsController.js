import * as transactionsSchemas from '../schemas/transactionSchemas.js';
import * as transactionsRepository from '../repositories/transactionsRepository.js';

export async function transactions(req, res) {
  try {
    const listTransactions = await transactionsRepository.select(req.userId);

    return res.status(200).send(listTransactions);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function addTransaction(req, res) {
  try {
    const { value, description } = req.body;

    if (transactionsSchemas.add.validate(req.body).error) return res.sendStatus(400);

    await transactionsRepository.add(req.userId, description, value);

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function removeTransaction(req, res) {
  try {
    const { transactionId } = req.params;

    if (transactionsSchemas.remove.validate(req.params).error) return res.sendStatus(400);

    const result = await transactionsRepository.remove(transactionId);

    if (!result) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}
