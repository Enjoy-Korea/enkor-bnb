jest.mock("../model/users.js");
import * as usersRepository from "../model/users.js";
import { join, login } from "./users.js";

const user = {
  id: 1,
  email: "exist@gmail.com",
  password: "$2a$12$VmsETpwD5rSAk7hqqT5h.umSIy/9E6ctnQXWBnvbiSLqBKjkH2BoS",
};

describe("join", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("201", async () => {
    const req = {
      body: { email: "new@gmail.com", password: "password" },
    };
    await join(req, res);
    expect(res.status).toBeCalledWith(201);
  });

  test("400 - empty email", async () => {
    const req = { body: { password: "password" } };
    await join(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test("400 - empty password", async () => {
    const req = { body: { email: "new@gmail.com" } };
    await join(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test("409 - duplicate email", async () => {
    const req = {
      body: { email: "exist@gmail.com", password: "password" },
    };
    usersRepository.findByEmail.mockReturnValue(Promise.resolve(user));
    await join(req, res);
    expect(res.status).toBeCalledWith(409);
  });
});

describe("login", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("200", async () => {
    const req = {
      body: { email: "exist@gmail.com", password: "password" },
    };
    usersRepository.findByEmail.mockReturnValue(Promise.resolve(user));
    await login(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  test("400 - empty body", async () => {
    const req = { body: {} };
    await login(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test("400 - empty email", async () => {
    const req = { body: { password: "password" } };
    await login(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test("400 - empty password", async () => {
    const req = { body: { email: "exist@gmail.com" } };
    await login(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test("401 - wrong email", async () => {
    const req = { body: { email: "wrong@gmail.com", password: "password" } };
    usersRepository.findByEmail.mockReturnValue(Promise.resolve(null));
    await login(req, res);
    expect(res.status).toBeCalledWith(401);
  });

  test("401 - wrong password", async () => {
    const req = { body: { email: "exist@gmail.com", password: "wrong" } };
    usersRepository.findByEmail.mockReturnValue(Promise.resolve(user));
    await login(req, res);
    expect(res.status).toBeCalledWith(401);
  });
});
