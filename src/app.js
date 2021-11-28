import express from 'express';
import cors from 'cors';
import * as userController from './controllers/userController.js';
import * as transactionsController from './controllers/transactionsController.js';
import authenticationMiddleware from './middlewares/authenticationMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/auth/sign-up', userController.signUp);
app.post('/auth/sign-in', userController.signIn);

app.post(
  '/transactions',
  authenticationMiddleware,
  transactionsController.addTransaction,
);
app.get(
  '/transactions',
  authenticationMiddleware,
  transactionsController.transactions,
);

app.delete(
  '/transactions/:transactionId',
  authenticationMiddleware,
  transactionsController.removeTransaction,
);

export default app;
