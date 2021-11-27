import './setup.js';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: '.env' });

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${process.env.PORT}`);
});
