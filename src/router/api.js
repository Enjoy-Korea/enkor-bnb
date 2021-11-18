import express from "express";
import "express-async-errors";
import usersRouter from "./users.js";
import housesRouter from "./houses.js";
import reservationsRouter from "./reservations.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/houses", housesRouter);
router.use("/reservations", isAuth, reservationsRouter);

export default router;
