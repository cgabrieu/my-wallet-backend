import connection from "../database/database.js";

export async function getTransactions(req, res) {
    try {
        const authorization = req.header("authorization");
        const token = authorization?.replace("Bearer ", "");

        const session = await connection.query(`
            SELECT "userId" FROM sessions
            WHERE token = $1;`,
            [token]
        );
        
        if (session.rowCount === 0)
            return res.status(401).send("Você foi desconectado.");

        const userId = session.rows[0].userId;
        const result = await connection.query(`
            SELECT * FROM transactions 
            WHERE "userId" = $1 
            ORDER BY id ASC;`,
            [userId]
        );

        res.status(200).send(result.rows);
    } catch (error) {
        res.status(500);
    }
}