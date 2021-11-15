const User = require("../controllers/userController");

const res = {
	status: jest.fn(() => res),
	json: jest.fn()
};
const next = jest.fn();
const mockUser = {
	create: jest.fn(),
	findOne: jest.fn(),
	checkLogin: jest.fn()
};

const token = "tokenTest";
const user = {
	body: {
		userEmail: "test10@test.com",
		userPw: "test",
		userName: "test"
	}
};

const newUser = {
	body: {
		userEmail: "new@new.com",
		userPw: "new"
	}
};

const failPw = {
	body: {
		userEmail: "test8@test.com",
		userPw: "fail"
	}
};
const mockAuth = {
	createToken: jest.fn()
};
beforeAll(async () => {});

describe("User Signup Test", () => {
	it("Signup Success", async () => {
		// given
		mockUser.findOne.mockReturnValue(null);
		mockUser.create.mockReturnValue(user.body);
		mockAuth.createToken.mockReturnValue(token);
		// when
		await User.signup(user, res, next);

		// then
		expect(res.status).toBeCalledWith(201);
	});
	it("Signup Fail (Email 중복)", async () => {
		// given
		mockUser.findOne.mockReturnValue(user.body);
		mockUser.create.mockReturnValue(user.body);
		try {
			// when
			await User.signup(user, res, next);
		} catch (err) {
			// then
			expect(err).toBeCalledWith(404);
		}
	});
});

describe("Signin Test", () => {
	it("Signin Success", async () => {
		// given
		mockUser.checkLogin.mockReturnValue(user.body);
		mockUser.findOne.mockReturnValue(user.body);

		// when
		await User.signin(user, res, next);

		// then
		expect(res.status).toBeCalledWith(200);
	});

	it("Signin Fail (Email 없음)", async () => {
		// given
		mockUser.checkLogin.mockReturnValue(newUser.body);
		mockUser.findOne.mockReturnValue(newUser.body);

		try {
			// when
			await User.signin(newUser, res, next);
		} catch (err) {
			// then
			expect(err).toBeCalledWith(404);
		}
	});

	it("Signin Fail (password 틀림)", async () => {
		// given
		mockUser.checkLogin.mockReturnValue(failPw.body);
		mockUser.findOne.mockReturnValue(user.body);

		try {
			// when
			await User.signin(failPw, res, next);
		} catch (err) {
			// then
			expect(err).toBeCalledWith(404);
		}
	});
});
