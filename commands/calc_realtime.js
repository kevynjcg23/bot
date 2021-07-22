const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
	name : 'calc',
	description : 'Calculate slp earned',
	args : true,
	execute(message, args) {
		axios.get('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=php')
			.then(r => {
				console.log(r.data['smooth-love-potion']['php']);
				const messageAuthor = message.guild.member(message.author).nickname;
				const currentSlpValue = parseFloat(r.data['smooth-love-potion']['php']);
				const userSlp = parseInt(args.slice(' ')[0]) / 2;
				const salary = parseFloat(currentSlpValue * userSlp);
				// message.reply(`You have currently earned ₱ ${salary}. \n SLP is currently ₱ ${currentSlpValue}.`);

				const embeddedReply = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setThumbnail(message.author.avatarURL())
					.setTitle(`Scholar Salary of ${messageAuthor} <:pepega:699546486803005480> <:pepega:699546486803005480>`)
					.setDescription('Your salary for your current slp is stated here.')
					.addFields(
						{ name: 'Total SLP Earned', value: `${userSlp * 2} <a:slp:858641363779846155> `, inline: true },
						{ name: 'Owned SLP', value: `${userSlp} <a:slp:858641363779846155>`},
						{ name: 'Current SLP Price', value: `**₱ ${currentSlpValue}**`, inline: true },
						{ name: 'Expected Cashout', value: `**₱ ${salary.toFixed(2)}**  <:pepemoney:865502865585471518>`, inline: false },
					)
					.setTimestamp()
					.setFooter('Powered by ESTAFABOT');

				message.reply(embeddedReply);
			})
			.catch(e => console.log(e));
	},
};