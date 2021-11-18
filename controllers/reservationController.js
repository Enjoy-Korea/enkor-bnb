const { reservation, room } = require("../models");

async function book(req, res, next) {
	try {
		const id = req.user.id;
		if (!id) throw new Error("권한이 없습니다.");
		console.log(id);
		const roomsId = req.query.id;

		const reservationInfo = await room.findOne({ where: { id: roomsId } });
		const type = reservationInfo.reservationType;
		if (type) {
			throw new Error("이미 예약되었습니다.");
		}

		await room.update(
			{ reservationType: true, reservationId: roomsId },
			{ where: { id: roomsId } }
		);

		const reservations = await reservation.create({
			roomId: roomsId,
			reservationType: true,
			userId: id
		});
		if (!reservations) throw new Error("예약에 실패했습니다.");

		res.status(201).json({
			reservations
		});
	} catch (err) {
		if (err.message === "권한이 없습니다.") err.status = 403;
		if (err.message === "예약에 실패했습니다.") err.status = 404;
		if (err.message === "이미 예약되었습니다.") err.status = 404;
		next(err);
	}
}

async function reservationInfo(req, res, next) {
	try {
		const reservationId = req.params.id;
		const userId = req.user.id;

		if (!userId) throw new Error("권한이 없습니다.");
		const email = req.user.userEmail;

		const reservationInfo = await reservation.findOne({
			attributes: ["id", "reservationType"],
			where: { id: reservationId, userId: userId },
			include: [room]
		});

		if (!reservationInfo) throw new Error("예약 정보가 없습니다.");

		res.status(200).json({ email, reservationInfo });
	} catch (err) {
		if (err.message === "권한이 없습니다.") err.status = 403;
		if (err.message === "예약 정보가 없습니다.") err.status = 404;
		next(err);
	}
}

module.exports = {
	book,
	reservationInfo
};
