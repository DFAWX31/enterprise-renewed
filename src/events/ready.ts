import { Client } from 'discord.js';
import { AppDataSource } from '../database/appdata';

module.exports = {
	name: 'ready',
	once: true,
	execute(client: Client) {
		console.log(`Ready! logged in as ${ client.user?.tag  }`)
		AppDataSource.initialize()
			.then(() => {
				console.log("connected to database")
			})
			.catch((error) => console.error(error))
	}
}