import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'gabriel',
    password: 'senhaboa123',
    database: 'mywallet',
});

export default connection;