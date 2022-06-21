import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { AppDataSource } from "../../database/appdata";
import { Players } from "../../database/entities/players";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('View your current balance'),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		const getEntry = await AppDataSource
			.getRepository(Players)
			.createQueryBuilder("players")
			.where("players.id = :id", { id: interaction.user.id})
			.getOne()

		if (!getEntry) {
			return interaction.reply({
				content: "Please join the game using join before doing this",
				ephemeral: true
			})
		}

		const balance = getEntry.balance

		interaction.reply(`Your current balance is ${balance}`)
	}
}