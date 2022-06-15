import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with command user\'s username!'),
	async execute(interaction :CommandInteraction) {
		await interaction.reply({
			content: `You are ${interaction.user}`,
			ephemeral: true
		})
	},
};
