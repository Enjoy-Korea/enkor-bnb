jest.mock("../model/reservations.js");
jest.mock("../model/houses.js");
import * as housesRepository from "../model/houses.js";
import { addReservation, getAllReservation } from "./reservations.js";

const house = {
  id: 1,
};

describe("addReservation", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("201", async () => {
    const req = { userId: 1, query: { houseId: 1 } };
    housesRepository.findById.mockReturnValue(Promise.resolve(house));
    await addReservation(req, res);
    expect(res.status).toBeCalledWith(201);
  });

  test("403", async () => {
    const req = { userId: undefined, query: { houseId: 1 } };
    await addReservation(req, res);
    expect(res.status).toBeCalledWith(403);
  });

  test("400 - empty houseId", async () => {
    const req = { userId: 1, query: {} };
    await addReservation(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test("400 - wrong houseId", async () => {
    const req = { userId: 1, query: { houseId: undefined } };
    await addReservation(req, res);
    expect(res.status).toBeCalledWith(400);
  });
});

describe("getAllReservation", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test("200", async () => {
    const req = { userId: 1 };
    await getAllReservation(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  test("403", async () => {
    const req = { userId: undefined };
    await getAllReservation(req, res);
    expect(res.status).toBeCalledWith(403);
  });
});
