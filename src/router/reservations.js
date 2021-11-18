import express from "express";
import "express-async-errors";
import * as reservationsController from "../controller/reservations.js";

const router = express.Router();

router
  .route("/")
  .post(reservationsController.addReservation)
  .get(reservationsController.getAllReservation); // 로그인한 유저의 모든 예약 내용 확인

export default router;
