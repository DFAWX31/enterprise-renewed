import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('show the store embed to purchase roles'),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		
	}
}