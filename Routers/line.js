const express = require("express");
const router = express.Router();
const line = require("@line/bot-sdk");
const Redis = require("ioredis");

require("dotenv").config();

const config = {
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const client = new line.Client(config);
const redis = new Redis(process.env.REDIS_URL);

const eventHandler = async (event) => {
	if (event.type !== "message" || event.message.type == "text") {
		return Promise.resolve(null);
	}
	const userId = event.source.userId;
	const messageText = event.message.text;

	// 限制用戶每分鐘最多發送 5 條訊息
	// rate_limit是前綴
	// redis.incr：這個命令會對指定的鍵進行原子性遞增操作。如果鍵不存在，會自動創建並將其值設置為 1。
	const limitKey = `rate_limit:${userId}`;
	const currentCount = await redis.incr(limitKey);

	if (currentCount === 1) {
		// 第一次設置過期時間
		await redis.expire(limitKey, 60); // 60 秒後重置計數
	}
	if (currentCount > 5) {
		console.log(`User ${userId} is rate limited`);
		return Promise.resolve(null);
	}

	// 檢查 Redis 中是否已經回覆過此訊息
	const cacheKey = `${userId}:${messageText}`;
	const cached = await redis.get(cacheKey);
	if (cached) {
		console.log(`Already replied to message:${messageText}`);
		return Promise.resolve(null);
	}

	await redis.set(cacheKey, "true", "EX", 600);

	// 回覆消息
	const replyText = {
		type: "text",
		text: "請您稍後，\n將有專人會為您回覆與服務。\n\n為避免訊息量過大，\n請耐心等候專人回覆。\n\n\n(此訊息為機器人自動回覆)",
	};
	const stickerMessage = {
		type: "sticker",
		packageId: "6136", // 貼圖包 ID
		stickerId: "10551377", // 貼圖 ID
	};
	return client.replyMessage(event.replyToken, [replyText, stickerMessage]);
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
