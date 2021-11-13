const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecretKey = process.env.jwtSecretKey;

const createToken = (payload) => {
	return jwt.sign(payload, jwtSecretKey, {
		// 토큰 생성 메서드
		expiresIn: "1h"
	});
};

const decodeToken = (token) => {
	return jwt.verify(token, jwtSecretKey);
};

const jwtMiddleware = (req, res, next) => {
	const token = req.headers.authorization;
	// token이 없으면 바로 return
	if (token === undefined) {
		next();
		return;
	}
	try {
		const decoded = decodeToken(token);
		const userEmail = decoded.userEmail;
		const userName = decoded.userName;
		req.user = { userEmail, userName };
	} catch (err) {
		req.user = null;

		console.log("token validation fail");
	} finally {
		next();
	}
};

module.exports = {
	createToken: createToken,
	jwtMiddleware: jwtMiddleware,
	decodeToken
};
