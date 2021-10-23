import express from 'express';
import cors from 'cors';

import { postSignUp } from './controllers/sign';

const SERVER_PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());

//SIGN-IN-&-UP
app.post('/sign-up', postSignUp);

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${port}`);
});