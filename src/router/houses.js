import express from "express";
import "express-async-errors";
import * as housesController from "../controller/houses.js";

const router = express.Router();

router.get("/", housesController.getAllHouse);
router.get("/:id", housesController.getHouse);

export default router;
