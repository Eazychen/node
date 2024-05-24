const express = require("express");
const mysql2 = require("mysql2/promise");
const cors = require("cors");

const app = express();

const corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/signUpAccount", async (req, res) => {
	const { email } = req.body;
	console.log(email);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ error: "Invalid email format" });
	}
	try {
		const connection = await mysql2.createConnection({
			host: "localhost",
			password: "wayne0713",
			user: "root",
			database: "test_db",
		});
		await connection.connect((err) => {
			if (err) {
				console.log("error");
				return;
			}
			console.log("success");
		});
		const [result] = await connection.query(
			`INSERT INTO test (test_name) VAlUES (?)`,
			[email]
		);
		connection.end();
		return res.json({ data: result });
	} catch (error) {
		console.log("database error", error);
		return res.status(500).json({ error: "database connection error" });
	}
});

app.listen(5001, () => {
	console.log("server is running 5001");
});
