import sequelizeModule from "sequelize";
import sequelize from "../db.js";
import { House } from "./houses.js";
import { User } from "./users.js";
import { Sequelize } from "sequelize";

const DataTypes = sequelizeModule.DataTypes;

export const Reservation = sequelize.define(
  "reservation",
  {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      references: {
        model: User,
        key: "id",
      },
    },
    houseId: {
      type: DataTypes.INTEGER(11),
      references: {
        model: House,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
Reservation.belongsTo(User);
Reservation.belongsTo(House);

const RESERVATION_OPTIONS = {
  attributes: [
    "id",
    "userId",
    [Sequelize.col("user.email"), "userEmail"],
    "houseId",
    [Sequelize.col("house.name"), "houseName"],
    [Sequelize.col("house.address"), "houseAddress"],
    "createdAt",
    "updatedAt",
  ],
  include: [
    {
      model: User,
      attributes: [],
    },
    {
      model: House,
      attributes: [],
    },
  ],
};

export async function create(reservation) {
  // return Reservation.create(reservation).then((data) =>
  //   Reservation.findByPk(data.dataValues.id, { ...RESERVATION_OPTIONS }).then(
  //     (data) => data.dataValues
  //   )
  // );
  const created = await Reservation.create(reservation);
  const createdReservation = await Reservation.findByPk(created.id, {
    ...RESERVATION_OPTIONS,
  });
  return createdReservation;
}

export async function findAllByUserId(userId) {
  return Reservation.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
    ...RESERVATION_OPTIONS,
  });
}
