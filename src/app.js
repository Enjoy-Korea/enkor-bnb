import express from "express";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import config from "./config.js";
import apiRouter from "./router/api.js";
import sequelize from "./db.js";
import yaml from "yamljs";
import swaggerUI from "swagger-ui-express";

const app = express();
const openApiDocument = yaml.load("src/openapi.yaml");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", apiRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openApiDocument));

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

// DB 연결
sequelize.sync().then(() => {
  console.log("✅ DB connection was successful.");
  // 서버 실행
  const PORT = config.host.port;
  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}.`);
  });
});
