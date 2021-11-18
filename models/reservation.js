// const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"reservation",
		{
			reservationType: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		},
		{
			timestamps: true,
			paranoid: true // 삭제일
		}
	);
};
