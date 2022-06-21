import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user from the guild')
		.addUserOption(option => option.setName('user').setDescription('The user to be given the boot 👢').setRequired(true))
		.setDefaultMemberPermissions(8),
	async execute(interaction: CommandInteraction) {

		const user = interaction.options.getUser('user')

		console.log(user)

		const member = interaction.guild?.members.cache.get(user?.id!)

		if (interaction.user.bot) return

		if (user?.id == interaction.user?.id) {
			return await interaction.reply({
				content: "You cannot kick yourself",
				ephemeral: true
			})
		}

		await interaction.reply({
			content: `You have succesfully kicked user ${user?.tag}`,
			ephemeral: true
		})

		member?.kick()
	}
}
