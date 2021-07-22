const Discord = require('discord.js');

module.exports = {
	name : 'predict',
	description : 'Calculate slp earned using suggested slp value',
	args : true,
	execute(message, args) {
		if(args.slice(' ').length != 2) {
			message.reply('Please provide your total SLP and suggested SLP Price.')
		}
		else{
			const userInputSlpValue = args.slice(' ')[0];
			const userInputSlpInPhp = args.slice(' ')[1];

			const messageAuthor = message.guild.member(message.author).nickname;
			const currentSlpValue = parseFloat(userInputSlpInPhp);
			const userSlp = parseInt(userInputSlpValue) / 2;
			const salary = parseFloat(currentSlpValue * userSlp);
			// message.reply(`You have currently earned ₱ ${salary}. \n SLP is currently ₱ ${currentSlpValue}.`);

			const embeddedReply = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Scholar Salary of ${messageAuthor} <:pepega:699546486803005480> <:pepega:699546486803005480>`)
				.setDescription('Your salary for your current slp is stated here.')
				.addFields(
					{ name: 'Total SLP Earned', value: `${userInputSlpValue} <a:slp:858641363779846155> ` },
					{ name: 'Owned SLP', value: `${userSlp} <a:slp:858641363779846155>` },
					{ name: 'Suggested SLP Price', value: `₱ ${userInputSlpInPhp}` },
					{ name: 'Money Earned', value: `₱ ${salary.toFixed(2)}` },
				)
				.setTimestamp()
				.setFooter('Powered by ESTAFABOT');

			message.reply(embeddedReply);
		}

	},
};