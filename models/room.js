module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"room",
		{
			// roomsId: {
			//     type: DataTypes.UUID(),
			//     allowNull: false,
			//     unique: true,
			// },
			name: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			address: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			university: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			images: {
				type: DataTypes.JSON,
				allowNull: false
			},
			houseType: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			pricePerDay: {
				type: DataTypes.DECIMAL(20),
				allowNull: false
			},
			reservationType: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		},
		{
			timestamps: false,
			paranoid: true // 삭제일
		}
	);
};
