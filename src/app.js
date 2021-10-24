import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { postSignUp } from './controllers/signUp.js';
import { postSignIn } from './controllers/signIn.js';
import { postNewTransaction } from './controllers/newTransaction.js';
import { getTransactions } from './controllers/transactions.js';

const app = express();

dotenv.config({ path: '.env' });
app.use(cors());
app.use(express.json());

//SIGN-IN-&-UP
app.post('/api/auth/signup', postSignUp);
app.post('/api/auth/signin', postSignIn);

//TRANSACTIONS
app.post('/api/transactions', postNewTransaction);
app.get('/api/transactions', getTransactions);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});