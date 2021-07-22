const sequelize = require('../dbObjects').sequelize;
const DataTypes = require('sequelize').DataTypes;
const Scholar = require('../models/Scholars')(sequelize, DataTypes);

module.exports = {
	name: 'unregister',
	description: 'Unregister your ronin to estafabot.',
	async execute(message, args) {
		const user_id = message.member.id;
		try {
			const user = await Scholar.findOne({
				where: {
					user_id: message.member.id,
				},
				limit: 1,
			});

			message.reply(
				`Scholar unregistered!\n Ronin: ${user.ronin}\n Username: ${message.author.username}`,
			);

			user.destroy();

		}
		catch (e) {
			console.log(e.message);
			return message.reply('You are currently unregistered.');
		}
	},
};