const Reservation = require("../controllers/reservationController");

const res = {
	status: jest.fn(() => res),
	json: jest.fn()
};
const next = jest.fn();

const mockReservation = {
	findOne: jest.fn(),
	update: jest.fn(),
	create: jest.fn()
};

const newReservation = {
	id: 1,
	roomId: "5",
	reservationType: true,
	userId: 10,
	updatedAt: "2021-11-14T14:32:11.715Z",
	createdAt: "2021-11-14T14:32:11.715Z"
};

const reservation = {
	query: {
		id: 6
	},
	user: {
		id: 1
	}
};

const reservationInfo = {
	params: {
		id: 6
	},
	user: {
		id: 1,
		email: "test@test.com"
	}
};

const failInfo = {
	params: {
		id: 200
	},
	user: {
		id: 1,
		email: "test@test.com"
	}
};

describe("Room Test", () => {
	it("Reservation Book Success", async () => {
		// given
		mockReservation.findOne.mockReturnValue(newReservation);

		// when
		await Reservation.book(reservation, res, next);

		// then
		expect(res.status).toBeCalledWith(201);
	});
	it("Reservation Info Success", async () => {
		// given
		mockReservation.findOne.mockReturnValue(newReservation);
		// when
		await Reservation.reservationInfo(reservationInfo, res, next);
		// then
		expect(res.status).toBeCalledWith(200);
	});

	it("Reservation Info Fail (reservationId 없음)", async () => {
		// given
		mockReservation.findOne.mockReturnValue(null);
		try {
			// when
			await Reservation.reservationInfo(failInfo, res, next);
		} catch (err) {
			// then
			expect(res.status).toBeCalledWith(404);
		}
	});
});
