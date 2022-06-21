import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Delete upto 99 messages')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages you want to delete 🚮').setRequired(true))
		.setDefaultMemberPermissions(8192),
	async execute(interaction: CommandInteraction) {
		const amount = interaction.options.getInteger('amount')!;

		if (amount < 1 || amount > 99) {
			return await interaction.reply({
				content: `You cannot delete ${amount}`,
				ephemeral: true
			})
		}

		if (interaction.channel?.type == "DM") return;

		if (interaction.user.bot) return;

		await interaction.channel?.bulkDelete(amount, true).catch(async error => {
			console.error(error)
			await interaction.reply({
				content: `There was an error trying to delete ${amount} messages`,
				ephemeral: true
			})
		})

		return await interaction.reply({
			content: `Succesfully deleted ${amount} messages`,
			ephemeral: true
		})
	}
}