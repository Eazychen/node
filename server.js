const express = require("express");
const cors = require("cors");
const lineRouter = require("./Routers/line");
const servicesRouter = require("./Routers/services");

require("dotenv").config();

const app = express();

const corsOptions = {
	origin: process.env.CORS_ORIGIN || "https://limingelectronics.netlify.app", // 允許來自此來源的請求
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", lineRouter);
app.use("/api", servicesRouter);

app.options("/api/submitForm", cors(corsOptions));
app.listen(5001, () => {
	console.log("server is running 5001");
});
