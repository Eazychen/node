const express = require("express");
const cors = require("cors");
const lineRouter = require("./Routers/line");
const servicesRouter = require("./Routers/services");

require("dotenv").config();

const app = express();

const corsOptions = {
	origin: process.env.CORS_ORIGIN || "https://limingelectronics.netlify.app", // 允許來自此來源的請求
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: ["Content-Type", "Authorization"],
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use("/line", lineRouter);

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", servicesRouter);

app.listen(process.env.PORT || 5001, () => {
	console.log("server is running 5001");
});
