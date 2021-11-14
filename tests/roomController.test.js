const Room = require("../controllers/roomController");

const res = {
	status: jest.fn(() => res),
	json: jest.fn()
};
const next = jest.fn();

const mockRoom = {
	findAll: jest.fn(),
	findOne: jest.fn()
};

const room = {
	query: {
		pageNo: 1,
		sort: 0
	}
};

const roomInfo = {
	params: {
		id: 1
	}
};
const failRoomId = {
	params: {
		id: 200
	}
};
describe("Room Test", () => {
	it("Room List Success", async () => {
		// given
		// mockRoom.findAll.mockReturnValue(room);
		// when
		await Room.roomList(room, res, next);

		// then
		expect(res.status).toBeCalledWith(200);
	});
	it("Room Info Success", async () => {
		// given
		mockRoom.findOne.mockReturnValue(roomInfo);
		// when
		await Room.roomInfo(roomInfo, res, next);
		// then
		expect(res.status).toBeCalledWith(200);
	});

	it("Room Info Fail (roomId 없음)", async () => {
		// given
		mockRoom.findOne.mockReturnValue(roomInfo);
		try {
			// when
			await Room.roomInfo(failRoomId, res, next);
		} catch (err) {
			// then
			expect(res.status).toBeCalledWith(404);
		}
	});
});
