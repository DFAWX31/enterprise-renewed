import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config';
import getFiles from './get_files';

const token = process.env.token!;
const clientId = process.env.clientId!;
const guildId = process.env.guildId!;

const commands :any[] = []
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = getFiles(commandsPath, '.ts')

// console.log(commandFiles);

commandFiles.forEach(file => {
	const command = require(file)

	commands.push(command.data.toJSON())
})

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
