import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { AppDataSource } from "../../../database/appdata";
import { Freebies } from "../../../database/entities/freebies";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Check the time remaining for claiming the timely rewards'),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		const getEntry = await AppDataSource
			.getRepository(Freebies)
			.createQueryBuilder("freebies")
			.where("freebies.user = :id", { id: interaction.user.id })
			.getOne()

		if (!getEntry) {
			return await interaction.reply({
				content: "Please use join before doing this",
				ephemeral: true
			})
		}

		const hour_special = (parseInt(getEntry.hourly)) + 3600
		const day_special = (parseInt(getEntry.daily)) + 86400
		const week_special = (parseInt(getEntry.weekly)) + 604800
		const month_special = (parseInt(getEntry.monthly)) + 2592000
		const year_special = (parseInt(getEntry.yearly)) + 31557600

		const dates: number[] = []

		dates.push(hour_special - Math.floor(Date.now() / 1000))
		dates.push(day_special - Math.floor(Date.now() / 1000))
		dates.push(week_special - Math.floor(Date.now() / 1000))
		dates.push(month_special - Math.floor(Date.now() / 1000))
		dates.push(year_special - Math.floor(Date.now() / 1000))

		const date_strings: string[] = []

		dates.forEach(date => {
			var delta = 0

			if (date >= 0) {
				var delta = date
			}

			var days = Math.floor(delta / 86400)
			delta -= days * 86400

			var hours = Math.floor(delta / 3600) % 24
			delta -= hours * 3600

			var minutes = Math.floor(delta / 60) % 60
			delta -= minutes * 60

			var seconds = delta % 60

			date_strings.push(days + ":" + hours + ":" + minutes + ":" + seconds)
		})


		const name_array = ["hourly", "daily", "weekly", "monthly", "yearly"]

		const embed = new MessageEmbed()
			.setTitle('Time remaining')
			.setDescription("The time remaining before you can do each command again")

		for (var i = 0; i < name_array.length; i++) {
			embed.addField(name_array[i], date_strings[i], false)
		}

		await interaction.reply({
			embeds: [embed]
		})
	}
}