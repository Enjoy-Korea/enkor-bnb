import sequelizeModule from "sequelize";
import sequelize from "../db.js";

const DataTypes = sequelizeModule.DataTypes;

export const House = sequelize.define(
  "house",
  {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    houseType: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    pricePerDay: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export async function findAll(page, pageSize, priceSort = "asc") {
  page = parseInt(page);
  pageSize = parseInt(pageSize);
  if (page <= 0) {
    page = 1;
  }
  const offset = (page - 1) * pageSize;
  return House.findAll({
    attributes: ["name", "university", "images", "houseType", "pricePerDay"],
    limit: pageSize,
    offset,
    order: [["pricePerDay", priceSort]],
  });
}

export async function findById(id) {
  return House.findByPk(id);
}
