const axios = require('axios');

module.exports = {
	name : 'slp',
	description : 'Check value of slp.',
	execute(message) {
		axios.get('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=php')
			.then(r => {
				const currentSlpValue = parseFloat(r.data['smooth-love-potion']['php']);
				message.channel.send(`The current value of SLP is **₱${currentSlpValue}**`);
			})
			.catch(e => console.log(e));
	},
};