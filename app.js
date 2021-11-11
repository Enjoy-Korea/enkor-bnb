const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { jwtMiddleware } = require("./libs/token");
const cors = require("cors");
const router = require("./router");

const port = process.env.port || 5000;

app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(jwtMiddleware);
app.use("/", router);

app.listen(port, () => console.log(`Server listening on port ${port}`));
