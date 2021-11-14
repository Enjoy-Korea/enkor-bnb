const { user } = require("../models");
const { createToken } = require("../libs/token");
const bcrypt = require("bcrypt");
async function signup(req, res, next) {
	try {
		const { userEmail, userPw, userName } = req.body;

		const find = await user.findOne({ where: { userEmail } });

		if (find !== null && userEmail === find.userEmail) {
			throw new Error("이미 존재하는 아이디입니다.");
		}

		const hash = await bcrypt.hash(userPw, 10);
		const users = await user.create({ userEmail, userPw: hash, userName });

		const token = createToken({ id: users.id, userEmail, userName });

		res.status(201).json({
			token
		});
	} catch (err) {
		if (err.message === "이미 존재하는 아이디입니다.") err.status = 409;
		next(err);
	}
}

async function signin(req, res, next) {
	try {
		const { userEmail, userPw } = req.body;
		const result = await checkLogin(userEmail, userPw);
		if (result === null) {
			throw new Error("존재하지 않는 아이디입니다.");
		}
		if (!result) {
			throw new Error("비밀번호를 확인해주세요.");
		}
		const token = createToken({
			id: result.id,
			userEmail: result.userEmail,
			userName: result.userName
		});
		res.status(200).json({
			token
		});
	} catch (err) {
		if (
			err.message === "존재하지 않는 아이디입니다." ||
			err.message === "비밀번호를 확인해주세요."
		)
			err.status = 404;
		next(err);
	}
}

async function checkLogin(userEmail, userPw) {
	try {
		const users = await user.findOne({ where: { userEmail } });

		if (users === null) return null;
		const isEqual = await bcrypt.compare(userPw, users.userPw);
		if (isEqual) {
			return users;
		}
		return false;
	} catch (err) {
		throw new Error("Login 확인이 불가능합니다.");
	}
}

module.exports = {
	signup,
	signin
};
