import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get your own or someone else\'s avatar url to steal 😏')
		.addUserOption(option => option.setName('target').setDescription('The user of which you want to steal the pfp 🥇')),
	async execute(interaction :CommandInteraction) {
		const user = interaction.options.getUser('target')
		

		if (user) return interaction.reply({
			content: `${user.tag}\'s avatar: ${user.displayAvatarURL({dynamic: true})}`
		})

		return interaction.reply(`Your avatar: ${interaction.user.avatarURL({dynamic: true})}`)
	}
}