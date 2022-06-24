import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { AppDataSource } from "../../database/appdata";
import { Players } from "../../database/entities/players";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('transfer some money from your account to another user\'s')
		.addUserOption(option => option.setName('user').setDescription('The user you are giving money to').setRequired(true))
		.addIntegerOption(option => option.setName('amount').setDescription('The amount you are giving to the user').setRequired(true)),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		const user = interaction.options.getUser('user')!
		const amount = interaction.options.getInteger('amount')!

		const getGiver = await AppDataSource
			.getRepository(Players)
			.createQueryBuilder('player')
			.where('player.id = :id', { id: interaction.user.id })
			.getOne()

		if (!getGiver) {
			return await interaction.reply({
				content: "Please use join before doing this!",
				ephemeral: true
			})
		}

		const getGetter = await AppDataSource
			.getRepository(Players)
			.createQueryBuilder("player")
			.where('player.id = :id', { id: user.id })
			.getOne()

		if (!getGetter) {
			return await interaction.reply({
				content: `Please ask the user ${user} to use join before using this command`,
				ephemeral: true
			})
		}

		if (amount > getGetter.balance) {
			return await interaction.reply({
				content: `You are ${amount - getGiver.balance} short`,
				ephemeral: true
			})
		}


		try {
			await AppDataSource
				.createQueryBuilder()
				.update(Players)
				.set({
					balance: getGiver.balance - amount
				})
				.where("id = :id", { id: interaction.user.id })
				.execute()

			await AppDataSource
				.createQueryBuilder()
				.update(Players)
				.set({
					balance: getGetter.balance + amount
				})
				.where("id = :id", { id: user.id })
				.execute()
		} catch (error) {
			console.error(error)
		}

		await interaction.reply(`Succesfully transferred ${amount} to ${user}'s balance from your balance`)
	}
}