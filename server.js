const express = require("express");
const cors = require("cors");
const lineRouter = require("./Routers/line");
const servicesRouter = require("./Routers/services");

require("dotenv").config();

const app = express();

const corsOptions = {
	origin: process.env.CORS_ORIGIN || "https://limingelectronics.netlify.app", // 允許來自此來源的請求
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions));

app.use("/api", lineRouter);
app.use("/api", servicesRouter);

app.listen(process.env.PORT, 5001, () => {
	console.log("server is running 5001");
});
