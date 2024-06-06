const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
	console.log("hi");
	return res.json();
});

module.exports = router;
