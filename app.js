const express = require("express");
const app = express();
const { jwtMiddleware } = require("./libs/token");
const cors = require("cors");
const router = require("./router");
const { sequelize } = require("./models/index");
sequelize
	.sync()
	.then(() => {
		console.log("DB Connected...");
	})
	.catch((err) => {
		console.log("DB Unconnected: ", err);
	});

const port = process.env.port || 5000;

app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(jwtMiddleware);
app.use("/", router);
app.use((err, req, res, next) => {
	if (err.message === "Unauthorized") err.status = 401;
	else if (err.message === "Forbidden") err.status = 403;
	switch (err.status) {
		case 401:
			if (!err.message) err.message = "Unauthorized";
			break;
		case 403:
			if (!err.message) err.message = "Forbidden";
			break;
		case 404:
			if (!err.message) err.message = "not found";
			break;
		case 409:
			if (!err.message) err.message = "Duplicated";
			break;
		default:
			err.status = 500;
			err.message = "서버에서 문제가 발생했습니다.";
	}
	res.status(err.status).send({ message: err.message });
});
app.listen(port, () => console.log(`Server listening on port ${port}`));
