const Discord = require('discord.js');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const http = require('http');

dotenv.config();

const fs = require('fs');

const prefix = '!';
const client = new Discord.Client();
client.commands = new Discord.Collection();

app.get('/', (request, response) => {
	console.log(Date.now() + ' Ping Received');
	response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 2800);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});


client.login(process.env.TOKEN);

module.exports = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});