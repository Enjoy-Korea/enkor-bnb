import express from "express";
import "express-async-errors";
import * as usersController from "../controller/users.js";

const router = express.Router();

router.post("/join", usersController.join);
router.post("/login", usersController.login);

export default router;
