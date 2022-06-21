import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		await interaction.deferReply({
			ephemeral: true
		})

		await wait(2000)

		await interaction.editReply({
			content: `Pong!🏓 ${interaction.client.ws.ping}ms`
		});
	},
};
