const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
	name : 'server',
	description : 'Check status of server.',
	async execute(message) {
		const html = await axios.get('https://axie.zone/axie-infinity-server-status');
		const $ = await cheerio.load(html.data);

		$('')
	},
};