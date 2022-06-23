import { Client } from 'discord.js';
import { AppDataSource } from '../database/appdata';
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: 'ready',
	once: true,
	async execute(client: Client) {
		console.log(`Ready! logged in as ${client.user?.tag}`)

		let retires = 5
		while (retires) {
			try {
				AppDataSource.initialize()
					.then(() => {
						console.log("connected to database")
					})
				break
			} catch (error) {
				console.error(error)
				retires -= 1
				console.log(`retries left : ${retires}`)
				await wait(5000)
			}
		}
	}
}