const express = require("express");
const router = express.Router();

const userController = require("../Controller/userController");
const roomController = require("../Controller/roomController");
const reservationController = require("../Controller/reservationController");

router.post("/users/signup", ); // 회원 가입
router.post("/users/signin", ); // 로그인

router.get("/rooms", ); // 상품 리스트
router.get("/rooms/:id",); // 상품 상세 정보

router.post("/reservation",); // 숙박 예약
router.get("/reservation/:id",); // 숙박 예약 확인
