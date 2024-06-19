const express = require("express");
const router = express.Router();
const line = require("@line/bot-sdk");

require("dotenv").config();

const config = {
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const client = new line.Client(config);

eventHandler = async (event) => {
	if (event.type === "message" && event.message.type === "text") {
		// 回覆文本消息
		const replyText = {
			type: "text",
			text: "避免訊息量過大，請耐心等候回覆\n(此為機器人自動回覆)。\n\n請您稍後，將有專人為您回覆服務。",
		};
		const stickerMessage = {
			type: "sticker",
			packageId: "6136", // 貼圖包 ID
			stickerId: "10551377", // 貼圖 ID
		};
		try {
			await client.replyMessage(event.replyToken, [replyText, stickerMessage]);
			console.log("Messages replied successfully");
		} catch (err) {
			console.error(`Error replying message: ${error}`);
			throw error;
		}
	} else {
		console.log(`Received event type: ${event.type}`);
	}
};

router.post("/webhook", line.middleware(config), (req, res) => {
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
