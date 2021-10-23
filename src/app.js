import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { postSignUp } from './controllers/sign.js';

const app = express();

dotenv.config({ path: '.env' });
app.use(cors());
app.use(express.json());

//SIGN-IN-&-UP
app.post('/sign-up', postSignUp);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});