module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"user",
		{
			userEmail: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					isEmail: true
				}
			},
			userPw: {
				type: DataTypes.STRING(200),
				allowNull: false
			},
			userName: {
				type: DataTypes.STRING(10),
				allowNull: false
			}
		},
		{
			timestamps: true,
			paranoid: true // 삭제일
		}
	);
};
