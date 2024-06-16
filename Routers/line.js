const express = require("express");
const router = express.Router();
const line = require("@line/bot-sdk");

require("dotenv").config();

const config = {
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

eventHandler = async (event) => {
	if (event.type !== "message" || event.message.type !== "text") {
		return Promise.resolve(null);
	}
	console.log(event.message.text);
};

router.post(
	"/webhook",
	(req, res, next) => {
		console.log("Config before middleware:", config);
		next();
	},
	line.middleware(config),
	(req, res, next) => {
		console.log("Middleware has processed the request", config);
		next();
	},
	(req, res) => {
		Promise.all(req.body.events.map(eventHandler))
			.then((result) => {
				return res.status(200).json(result);
			})
			.catch((err) => {
				console.error(err.stack);
				return res.status(500).send("Error handling message");
			});
	}
);
module.exports = router;
