const express = require("express");
const mysql2 = require("mysql2/promise");
const cors = require("cors");
const lineRouter = require("./Routers/line");

require("dotenv").config();

const app = express();

const corsOptions = {
	origin: "*",
};

app.use("/api/line", lineRouter);
app.use(cors(corsOptions));
app.use(express.json());

app.post("/services", async (req, res) => {
	const { phone, name, service } = req.body;
	console.log(phone, name, service);
	const phoneRegex = /^09\d{8}$/;
	if (!phoneRegex.test(phone)) {
		return res.status(400).json({ error: "Invalid phone format" });
	}
	try {
		const connection = await mysql2.createConnection({
			host: "localhost",
			password: "wayne0713",
			user: "root",
			database: "electrical",
		});
		await connection.connect((err) => {
			if (err) {
				console.log("error");
				return;
			}
			console.log("success");
		});
		const [result] = await connection.query(
			`INSERT INTO customer (name , phone, service) VAlUES (?, ? ,?)`,
			[name, phone, service]
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
