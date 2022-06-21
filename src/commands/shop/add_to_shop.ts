import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Role } from "discord.js";
import { AppDataSource } from "../../database/appdata";
import { Shop } from "../../database/entities/shop";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sell')
		.setDescription('Add a role to be bought to the shop')
		.addRoleOption(option => option.setName('role').setDescription('The role to be added to the shop').setRequired(true))
		.addIntegerOption(option => option.setName('price').setDescription('The cost of the role').setRequired(true))
		.setDefaultMemberPermissions(268435456),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		const role = interaction.options.getRole('role')!
		const price = interaction.options.getInteger('price')!


		const getEntry = await AppDataSource
			.getRepository(Shop)
			.createQueryBuilder()
			.where('role = :role', { role: role?.id })
			.getOne()

		if (getEntry) {
			return interaction.reply({
				content: `${role} is already in shop`,
				ephemeral: true
			})
		}

		const item = new Shop()
		item.price = price
		item.role = role.id.toString()
		AppDataSource.manager.save(item)

		interaction.reply({
			content: `Added ${role} to shop for ${price}`,
			ephemeral: true
		})
	}
}