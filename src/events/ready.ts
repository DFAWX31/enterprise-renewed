import { Client } from 'discord.js';
import { AppDataSource } from '../database/appdata';

module.exports = {
	name: 'ready',
	once: true,
	async execute(client: Client) {
		console.log(`Ready! logged in as ${client.user?.tag}`)

		try {
			AppDataSource.initialize()
				.then(() => {
					console.log("successfully connected to the database")
				})
				.catch((error => console.error(error)))
		} catch (error) {
			console.error(error)
		}
	}
}