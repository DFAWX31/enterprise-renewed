import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { AppDataSource } from "../../database/appdata";
import { Shop } from "../../database/entities/shop";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a role from the shop')
		.addRoleOption(option => option.setName('role').setDescription('The role to be removed from the shop').setRequired(true))
		.setDefaultMemberPermissions(268435456),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		const role = interaction.options.getRole('role')

		const getEntry = await AppDataSource
			.getRepository(Shop)
			.createQueryBuilder()
			.where("role = :role", { role: role?.id })
			.getOne()

		if (!getEntry) {
			return interaction.reply({
				content: `${role} not found in the shop`,
				ephemeral: true
			})
		}

		try {
			await AppDataSource
				.createQueryBuilder()
				.delete()
				.from(Shop)
				.where("role = :role", { role: role?.id.toString() })
				.execute()
		} catch (error) {
			console.error(error)
		}

		interaction.reply({
			content: `${role} has been removed from the shop`,
			ephemeral: true
		})

	}
}