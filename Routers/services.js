const express = require("express");
const pg = require("pg");

require("dotenv").config();

const router = express.Router();

const config = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};

const client = new pg.Client(config);

client
	.connect()
	.then(() => {
		console.log("connected to PostgreSQl");
	})
	.catch((err) => {
		console.log("Connection error", err);
	});

const saveFormData = async (name, phone, service) => {
	const query =
		"INSERT INTO services (user_name,phone,service) VALUES ($1,$2,$3)";
	const values = [name, phone, service];
	try {
		await client.query(query, values);
	} catch (err) {
		console.log("Error saving form data", err);
		throw err;
	}
};

const validatePhoneNumber = (phone) => {
	const phoneRegex = /^09\d{8}$/;
	return phoneRegex.test(phone);
};

router.post("/submitForm", async (req, res) => {
	const { name, phone, service } = req.body;

	if (!validatePhoneNumber(phone)) {
		return res.status(404).json({ error: "Invalid phone number" });
	}
	try {
		await saveFormData(name, phone, service);
		res.json({ message: "form data saved success" });
	} catch (err) {
		res.status(500).json({ error: "Error saving form data" });
	}
});

module.exports = router;
