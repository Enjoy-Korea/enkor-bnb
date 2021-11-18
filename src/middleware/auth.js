import jwt from "jsonwebtoken";
import config from "../config.js";
import * as usersRepository from "../model/users.js";

export const isAuth = async (req, res, next) => {
  // 헤더에 토큰이 존재하는지 체크
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  // 존재하는 토큰이 유효한지 체크
  const accessToken = authHeader.split(" ")[1];
  jwt.verify(accessToken, config.jwt.secret, async (error, decoded) => {
    if (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const user = await usersRepository.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    // 유효한 토큰이라면 req객체에 userId 추가
    req.userId = user.id;
    next();
  });
};
