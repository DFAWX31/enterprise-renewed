import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { AppDataSource } from "../../database/appdata";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join the economy game'),
		async execute(interaction: CommandInteraction) {
			if (interaction.user.bot) return

			AppDataSource.initialize()
				.then()
		}

}