"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db table 생성
db.user = require("./user")(sequelize, Sequelize);
db.room = require("./room")(sequelize, Sequelize);
db.reservation = require("./reservation")(sequelize, Sequelize);

// user - room : 1대 다 관계 설정
db.user.hasMany(db.reservation, { foreignKey: "userId", sourceKey: "id" });
db.reservation.belongsTo(db.user, { foreignKey: "userId", targetKey: "id" });

// room - reservation : 1대 1 관계 설정
db.room.hasOne(db.reservation, { foreignKey: "roomId", sourceKey: "id" });
db.reservation.belongsTo(db.room, { foreignKey: "roomId", targetKey: "id" });

module.exports = db;
