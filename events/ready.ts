import { Client } from 'discord.js';

module.exports = {
	name: 'ready',
	once: true,
	execute(client: Client) {
		console.log(`Ready! logged in as ${ client.user?.tag  }`)
	}
}