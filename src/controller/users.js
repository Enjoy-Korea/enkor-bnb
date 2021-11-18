import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import * as usersRepository from "../model/users.js";

function createJwt(userId) {
  return jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}

export async function join(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "잘못된 요청입니다.",
    });
  }
  const foundUser = await usersRepository.findByEmail(email);
  if (foundUser) {
    return res.status(409).json({
      success: false,
      message: "이미 존재하는 이메일입니다.",
    });
  }
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.salt);
  await usersRepository.create({
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    success: true,
  });
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "잘못된 요청입니다.",
    });
  }
  const foundUser = await usersRepository.findByEmail(email);
  if (!foundUser) {
    return res.status(401).json({
      success: false,
      message: "이메일과 비밀번호를 확인해 주세요.",
    });
  }
  const isValidPassword = await bcrypt.compare(password, foundUser.password);
  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      message: "이메일과 비밀번호를 확인해 주세요.",
    });
  }
  const accessToken = createJwt(foundUser.id);
  res.status(200).json({
    success: true,
    accessToken,
  });
}
