import express from 'express';
import cors from 'cors';

import { postSignUp } from './controllers/signUp.js';
import { postSignIn } from './controllers/signIn.js';
import { postNewTransaction } from './controllers/newTransaction.js';
import { getTransactions } from './controllers/transactions.js';

const app = express();

app.use(cors());
app.use(express.json());

//SIGN-IN-&-UP
app.post('/api/auth/signup', postSignUp);
app.post('/api/auth/signin', postSignIn);

//TRANSACTIONS
app.post('/api/transactions', postNewTransaction);
app.get('/api/transactions', getTransactions);

export default app;