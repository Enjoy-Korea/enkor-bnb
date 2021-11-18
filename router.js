const express = require("express");
const router = express.Router();

const userController = require("./controllers/userController");
const roomController = require("./controllers/roomController");
const reservationController = require("./controllers/reservationController");

router.post("/users/signup", userController.signup); // 회원 가입
router.post("/users/signin", userController.signin); // 로그인

router.get("/rooms", roomController.roomList); // 상품 리스트
router.get("/rooms/:id", roomController.roomInfo); // 상품 상세 정보

router.get("/reservation", reservationController.book); // 숙박 예약
router.get("/reservation/:id", reservationController.reservationInfo); // 숙박 예약 확인

module.exports = router;
