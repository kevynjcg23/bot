module.exports = (sequelize, DataTypes) => {
	return sequelize.define('scholars', {
		ronin: {
			type: DataTypes.STRING,
			unique: true,
		},
		user_id: {
			primaryKey: true,
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
	});
};