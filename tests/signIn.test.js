import connection from '../src/database/database.js';
import bcrypt from 'bcrypt';
import app from '../src/app.js'
import supertest from 'supertest';
import faker from 'faker/locale/pt_BR';

const request = supertest(app);

afterAll(() => {
	connection.end();
});

beforeEach(async () => {
	await connection.query(`DELETE FROM users;`);
	await connection.query(`DELETE FROM sessions;`);
});

async function createUser() {
	const pass = faker.internet.password(8);
	const hash = bcrypt.hashSync(pass, 10);

	const newUser = await connection.query(`
		INSERT INTO users (name, email, password) 
		VALUES ($1, $2, $3) 
		RETURNING email, password;`,
		[faker.name.findName(), faker.internet.email(), hash]
	);
	newUser.rows[0].password = pass;
	return newUser.rows[0];
}

describe("POST /api/auth/signin", () => {

	it("returns status 200 for valid access", async () => {
		const newUser = await createUser();

		const bodyData = {
			email: newUser.email,
			password: newUser.password
		};

		const result = await request.post("/api/auth/signin").send(bodyData);
		expect(result.status).toEqual(200);
	});

	it("returns status 400 for invalid format properties", async () => {
		const bodyData = {};
		const result = await request.post("/api/auth/signin").send(bodyData);
		expect(result.status).toEqual(400);
	});

	it("returns status 401 for invalid password", async () => {
		const newUser = await createUser();

		const bodyData = {
			email: newUser.email,
			password: newUser.password + "WRONG"
		};
		
		const result = await request.post("/api/auth/signin").send(bodyData);
	
		expect(result.status).toEqual(401);
	});

	it("returns status 401 for invalid email", async () => {
		const bodyData = {
			email: "qualquercoisa@email.com",
			password: "SenhaQuePassaNoTesteDeForça@123"
		};
		
		const result = await request.post("/api/auth/signin").send(bodyData);
	
		expect(result.status).toEqual(401);
	});

	it("creates a session for valid access", async () => {
		const newUser = await createUser();

		const bodyData = {
			email: newUser.email,
			password: newUser.password
		};

		const sessions = await connection.query(`SELECT * FROM sessions`);
		expect(sessions.rows.length).toEqual(0);

		await request.post("/api/auth/signin").send(bodyData);

		const newSessions = await connection.query(`SELECT * FROM sessions;`);
		expect(newSessions.rows.length).toEqual(1);
	});

	it("returns a token for valid access", async () => {
		const newUser = await createUser();
		const bodyData = {
			email: newUser.email,
			password: newUser.password
		};

		const { body } = await request.post("/api/auth/signin").send(bodyData);

		const lastSession = await connection.query(`
			SELECT * FROM sessions 
		  	ORDER BY id DESC 
		  	LIMIT 1;`
		);

		const { token } = lastSession.rows[0];
		expect(body.token).toEqual(token);
	});

});