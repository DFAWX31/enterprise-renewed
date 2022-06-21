import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sell')
		.setDescription('Add a role to be bought to the shop')
		.setDefaultMemberPermissions(268435456),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		
	}
}