import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { AppDataSource } from "../../database/appdata";
import { Freebies } from "../../database/entities/freebies";
import { Players } from "../../database/entities/players";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join the economy game'),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return


		const getEntry = await AppDataSource
			.getRepository(Players)
			.createQueryBuilder("players")
			.where("players.id = :id", { id: interaction.user.id })
			.getOne()

		if (!getEntry) {
			const user = new Players()
			user.id = interaction.user.id.toString()
			user.balance = 0
			AppDataSource.manager.save(user)
			await interaction.reply({
				content: `${interaction.user} joined the game with 0 balance`,
				ephemeral: true
			})
			const freebie = new Freebies()
			freebie.user = user
			AppDataSource.manager.save(freebie)
		} else {
			await interaction.reply({
				content: "You have already joined the game",
				ephemeral: true
			})
		}
	}
}