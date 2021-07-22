const sequelize = require('../dbObjects').sequelize;
const DataTypes = require('sequelize').DataTypes;
const Scholar = require('../models/Scholars')(sequelize, DataTypes);

module.exports = {
	name: 'register',
	description: 'Register your ronin to estafabot.',
	args: true,
	async execute(message, args) {
		if (!args.length) {
			message.reply('Blank input is not allowed!');
		}

		const ronin = args.slice(' ')[0];
		const user_id = message.member.id;
		if(ronin.length < 42) {
			message.reply('Too short for a ronin id. Omit the *ronin:* from your scholar account ronin and replace it with 0x!');
		}
		else if(ronin.length > 42) {
			message.reply('Too long for a ronin id. Omit the *ronin:* from your scholar account ronin and replace it with 0x!');
		}
		else if(ronin[0] != '0' && ronin[1] != 'x') {
			message.reply('Invalid ronin. Please make sure it starts with 0x. Copy your ronin id and replace the "ronin:" with 0x.');
		}
		else {
			console.log(user_id);
			console.log(ronin);
			console.log(message.author.username);

			try {
				await Scholar.create({
					ronin: ronin,
					user_id: user_id,
					name: message.author.username,
				});

				return message.reply(
					`Scholar registered!\n Ronin: ${ronin}\n Username: ${message.author.username}`,
				);
			}
			catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') {
					return message.reply(
						`${message.author.username} is already registered!`,
					);
				}
				console.log(e.message);
				return message.reply(`${e} + ${e.name} + ${e.message}`);
			}
		}
	},
};
