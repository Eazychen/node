const express = require("express");
const router = express.Router();
const line = require("@line/bot-sdk");

require("dotenv").config();

const config = {
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

if (!config.channelSecret || !config.channelAccessToken) {
	console.log(
		"LINE bot configuration error: missing channelSecret or channelAccessToken"
	);
}

eventHandler = async (event) => {
	if (event.type !== "message" || event.message.type !== "text") {
		return Promise.resolve(null);
	}
	console.log(event.message.text);
};

router.post("/webhook", (req, res) => {
	console.log(config);
	Promise.all(req.body.events.map(eventHandler))
		.then((result) => {
			return res.status(200).json(result);
		})
		.catch((err) => {
			console.error(err.stack);
			return res.status(500).send("Error handling message");
		});
});
module.exports = router;
