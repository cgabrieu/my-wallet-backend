import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: '.env' });

app.listen(process.env.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
