import fs from 'node:fs';
import path from 'node:path';
import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import 'dotenv/config'

class MyClient extends Client {
	commands = {} as {
		[key: string]: any
	}
	
	constructor(options :ClientOptions) {
		super(options)
	}
}

const token = process.env.token!;

const client:MyClient = new MyClient({
	intents:[
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`Ready! as ${client.user?.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return

	const command = client.commands.get(interaction.commandName);

	if (!command) return

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);