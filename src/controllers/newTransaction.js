import connection from "../database/database.js";

import { validateTransaction } from "../validations/transaction.js";

export async function postNewTransaction(req, res) {
    try {
        const authorization = req.header("authorization");
        const token = authorization?.replace("Bearer ", "");

        const { value, description } = req.body;

        if ((validateTransaction.validate(req.body)).error)
            return res.status(400).send("Dados inválidos.");

        const session = await connection.query(`
            SELECT "userId" FROM sessions
            WHERE token = $1;`,
            [token]
        );
        
        if (session.rowCount === 0)
            return res.status(401).send("Você foi desconectado.");

        const userId = session.rows[0].userId;
        await connection.query(`
            INSERT INTO transactions
            ("userId", description, value)
            VALUES ($1, $2, $3);`,
            [userId, description, value]
        );
        res.status(201).send({
            userId,
            description,
            value
        });

    } catch (error) {
        res.status(500);
    }
}