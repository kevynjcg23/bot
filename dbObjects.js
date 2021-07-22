const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Scholar = require('./models/Scholars')(sequelize, Sequelize.DataTypes);

module.exports = {
	sequelize,
	Scholar,
};