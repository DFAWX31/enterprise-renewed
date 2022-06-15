import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Delete upto 99 messages')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages you want to delete 🚮')),
	async execute(interaction: CommandInteraction) {
		const amount = interaction.options.getInteger('amount')!;

		if (amount < 1 || amount > 99) {
			return interaction.reply({
				content: `You cannot delete ${amount}`,
				ephemeral: true
			})
		}

		if (interaction.channel?.type == "DM") return;

		if (interaction.user.bot) return;

		await interaction.channel?.bulkDelete(amount, true).catch(error => {
			console.error(error)
			interaction.reply({
				content: `There was an error trying to delete ${ amount } messages`,
				ephemeral: true
			})
		})

		return interaction.reply({
			content: `Succesfully deleted ${ amount } messages`,
			ephemeral: true
		})
	}
}