const express = require("express");
const cors = require("cors");
const lineRouter = require("./Routers/line");
const servicesRouter = require("./Routers/services");

require("dotenv").config();

const app = express();

const corsOptions = {
	origin: "http://localhost:3000", // 允許來自此來源的請求
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true, // 如果需要處理 cookies 等
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", lineRouter);
app.use("/api", servicesRouter);

app.listen(5001, () => {
	console.log("server is running 5001");
});
