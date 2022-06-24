import path from 'node:path';
import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import 'dotenv/config'
import getFiles from './get_files';
import { AppDataSource } from './database/appdata';

class MyClient extends Client {
	commands = {} as {
		[key: string]: any
	}

	constructor(options: ClientOptions) {
		super(options)
	}
}

const token = process.env.token!;

const client: MyClient = new MyClient({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
	]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = getFiles(commandsPath, '.ts')

commandFiles.forEach(file => {
	const command = require(file)

	client.commands.set(command.data.name, command)
})

const eventPath = path.join(__dirname, 'events')
const eventFiles = getFiles(eventPath, '.ts')

eventFiles.forEach(file => {
	const event = require(file)

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args))
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.editReply({
			content: 'There was an error while executing this command!'
		});
	}
})

client.login(token);