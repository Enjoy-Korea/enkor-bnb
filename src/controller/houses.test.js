jest.mock("../model/houses.js");
import * as housesRepository from "../model/houses.js";
import { getAllHouse, getHouse } from "./houses.js";

const house = {
  id: 1,
};

describe("getAllHouse", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("200", async () => {
    const req = { query: { page: 1, pageSize: 5 } };
    await getAllHouse(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  test("400 - empty query", async () => {
    const req = { query: {} };
    await getAllHouse(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test("400 - empty page", async () => {
    const req = { query: { pageSize: 5 } };
    await getAllHouse(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test("400 - empty pageSize", async () => {
    const req = { query: { page: 1 } };
    await getAllHouse(req, res);
    expect(res.status).toBeCalledWith(400);
  });
});

describe("getHouse", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("200", async () => {
    const req = { params: { id: 1 } };
    housesRepository.findById.mockReturnValue(Promise.resolve(house));
    await getHouse(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  test("404", async () => {
    const req = { params: { id: undefined } };
    housesRepository.findById.mockReturnValue(Promise.resolve(null));
    await getHouse(req, res);
    expect(res.status).toBeCalledWith(404);
  });
});
