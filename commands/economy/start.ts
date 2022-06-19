import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Join the economy game'),
		async execute(interaction: CommandInteraction) {
			if (interaction.user.bot) return

			
		}

}