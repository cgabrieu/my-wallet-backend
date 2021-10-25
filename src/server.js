import app from "./app.js";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});