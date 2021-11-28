import { validateTransaction } from '../schemas/transactionSchemas.js';
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

    if (validateTransaction.validate(req.body).error) return res.sendStatus(400);

    await transactionsRepository.add(req.userId, description, value);

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}
