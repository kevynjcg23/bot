const axios = require('axios');
const Discord = require('discord.js');
const sequelize = require('../dbObjects').sequelize;
const DataTypes = require('sequelize').DataTypes;
const Scholar = require('../models/Scholars')(sequelize, DataTypes);
const moment = require('moment');
const helpers = require('../helpers');

module.exports = {
	name: 'astats',
	description: 'Show player stats',
	async execute(message) {
		console.log('Stats called');
		await Scholar.findOne({
			where: {
				user_id: message.member.id,
			},
			limit: 1,
		})
			.then(function(registeredUser) {
				console.log(registeredUser.ronin);
				message.reply(new Discord.MessageEmbed().setColor('#0099ff').setTitle('Please wait').setDescription('Bot is getting the info.')).then(sentMessage => {
					axios
						.get(`https://api.lunaciarover.com/stats/${registeredUser.ronin}`)
						.then((r) => {
							console.log(r.data);

							const today = new Date();
							const lastClaimedDate = new Date(r.data['last_claim_timestamp'] * 1000);

							const diffInTime = new Date(helpers.getFormattedDate(today)).getTime() - new Date(helpers.getFormattedDate(lastClaimedDate)).getTime();
							const diffInDays = (diffInTime / (1000 * 3600 * 24)) + 1;

							console.log(helpers.getFormattedDate(today));
							console.log(diffInDays);

							const lastUpdatedAt = moment(new Date(r.data['updated_on'] * 1000)).format('dddd, MMMM Do YYYY, h:mm:ss a');
							const lastClaimedAt = moment(new Date(r.data['last_claim_timestamp'] * 1000)).format('dddd, MMMM Do YYYY, h:mm:ss a');

							const dailyAverage = r.data['total_slp'] / diffInDays;

							const embeddedReply = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(
									`Stats for ${message.guild.member(message.author).nickname}`,
								)
								.setDescription('Your axie stats as of now.')
								.addFields(
									{ name: 'IGN', value: `${r.data['ign']} ` },
									{ name: 'Daily Average', value: `${Math.round(dailyAverage)}` },
									{ name: 'Last Updated At', value: `${lastUpdatedAt}` },
									{ name: 'Last Claim Amount', value: `${r.data['last_claim_amount']} ` },
									{ name: 'Last Claim Date', value: `${lastClaimedAt}` },
									{ name: 'MMR', value: `${r.data['mmr']} ` },
									{ name: 'Ronin SLP', value: `${r.data['ronin_slp']}` },
									{ name: 'Total SLP', value: `${r.data['total_slp']}` },
									{ name: 'In Game SLP', value: `${r.data['in_game_slp']}` },
									{ name: 'Total Matches', value: `${r.data['total_matches']}` },
									{ name: 'Win Rate', value: `${(parseFloat(r.data['win_rate']) * 100).toFixed(2)}%` },
								)
								.setTimestamp()
								.setFooter('Powered by ESTAFABOT');
							message.channel.messages.fetch(sentMessage.id)
								.then(message => message.edit(embeddedReply));

						})
						.catch((e) => sentMessage.edit(new Discord.MessageEmbed()
							.setTitle('SERVER IS DOWN!')
							.setDescription(`The server is currently unreachable :(\n ${e.message}`)
							.attachFiles(['https://tenor.com/view/mati-bodoh-bangang-keranda-menari-gif-16794417'])));
				});

			})
			.catch((e) => message.reply('You are not registered!'));
	},
};
