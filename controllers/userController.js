const { user } = require("../models");
const { createToken } = require("../libs/token");
const bcrypt = require("bcrypt");
async function signup(req, res, next) {
	try {
		const { userEmail, userPw, userName } = req.body;
		const find = await user.findOne({ userEmail });
		console.log(find);

		if (find !== null && userEmail === find.userEmail) {
			throw new Error("email");
		}

		const hash = await bcrypt.hash(userPw, 10);
		await user.create({ userEmail, userPw: hash, userName });

		const token = createToken({ userEmail, userName });
		res.status(201).json({
			token
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
}

async function signin(req, res, next) {
	try {
		const { userEmail, userPw } = req.body;
		const result = await checkLogin(userEmail, userPw);
		if (result === null) {
			throw new Error("userEmail");
		}
		if (!result) {
			throw new Error("pw");
		}

		const token = createToken({
			userEmail: result.userEmail,
			userPw: result.userPw
		});

		res.status(200).json({
			token
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
}

async function checkLogin(userEmail, userPw) {
	try {
		const users = await user.findOne({ userEmail });
		console.log(users);
		if (users === null) return null;
		const isEqual = await bcrypt.compare(userPw, users.userPw);
		if (isEqual) return user;
		return false;
	} catch (err) {
		throw new Error();
	}
}

module.exports = {
	signup,
	signin
};
