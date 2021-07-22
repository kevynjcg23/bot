const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Scholars = require('./models/Scholars')(sequelize, Sequelize.DataTypes);
// require('./models/Users')(sequelize, Sequelize.DataTypes);
// require('./models/UserItems')(sequelize, Sequelize.DataTypes);

// const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force: true }).then(async () => {
	await Scholars.sync();
	// const shop = [
	// 	CurrencyShop.upsert({ name: 'Tea', cost: 1 }),
	// 	CurrencyShop.upsert({ name: 'Coffee', cost: 2 }),
	// 	CurrencyShop.upsert({ name: 'Cake', cost: 5 }),
	// ];
	// await Promise.all(Scholc);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);