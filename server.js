const express = require("express");
const cors = require("cors");
const lineRouter = require("./Routers/line");
const servicesRouter = require("./Routers/services");

require("dotenv").config();

const app = express();

const corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", lineRouter);
app.use("/api", servicesRouter);

app.listen(5001, () => {
	console.log("server is running 5001");
});
