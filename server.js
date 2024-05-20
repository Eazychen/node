const express = require("express");

const app = express();
app.get("/services", (req, res) => {
	console.log(req);
	return res.json({ data: "helloworld" });
});

app.listen(5001, () => {
	console.log("server is running 5001");
});
