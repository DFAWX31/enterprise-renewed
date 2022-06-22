import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { AppDataSource } from "../../database/appdata";
import { Rule } from "../../database/entities/rule";
import { Rules } from "../../database/entities/rules";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("Send")
		.setDescription("Send the roels embed")
		.addChannelOption(option => option.setName("channel").setDescription("The channel to send the rules to").setRequired(true))
		.setDefaultMemberPermissions(32),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		let channel = interaction.options.getChannel("channel")!

		const getRule = await AppDataSource
			.getRepository(Rule)
			.createQueryBuilder("rule")
			.where("rule.guild = :guild", { guild: interaction.guild?.id })
			.getOne()

		if (!getRule) {
			return await interaction.reply({
				content: "no roles found for this server",
				ephemeral: true
			})
		}

		const getRules = await AppDataSource
			.getRepository(Rules)
			.createQueryBuilder("rules")
			.where("rules.id = :id", { id: getRule.id })
			.getMany()

		if (!getRules) {
			return await interaction.reply({
				content: "the rules have not been initialized yet!!",
				ephemeral: true
			})
		}

		const embed = new MessageEmbed()
			.setTitle("📜RULES!!📜")
			.setDescription("🔴🔴🔴Please read carefully before reacting!!!🔴🔴🔴")
			.setColor("#8a948c")

		for (var i = 0; i < getRules.length; i++) {
			embed.addField(`Rule number ${i + 1}`, getRules[i].rule_string, false)
		}

		if (getRule.message) {
			const channel = interaction.guild?.channels.cache.find(chanel => chanel.id == getRule.channel)!
			
			const message = channel.
		}
	}
}