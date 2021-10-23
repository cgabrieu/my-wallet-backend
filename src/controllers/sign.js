import connection from "../database/database.js";
import bcrypt from 'bcrypt';

import { validateSignUp } from "../validation/signUp.js";

export async function postSignUp(req, res) {
    try {
        const { name, email, password } = req.body;

        if ((validateSignUp.validate(req.body)).error) 
            return res.status(400).send("Dados inválidos.");

        const hasUser = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        if (hasUser.rowCount > 0) return res.status(409).send("Usuário já existente.");

        const hashPassword = bcrypt.hashSync(password, 10);

        await connection.query(`
            INSERT INTO users
            (name, email, password)
            VALUES ($1, $2, $3);`,
            [name, email, hashPassword]
        );
        
        res.status(201).send("Conta criada com sucesso.");
    } catch (error) {
        console.log(error);
        res.status(500);
    }

}