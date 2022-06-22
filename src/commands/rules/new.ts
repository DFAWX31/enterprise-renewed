import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { AppDataSource } from "../../database/appdata";
import { Rule } from "../../database/entities/rule";
import { Rules } from "../../database/entities/rules";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("add_rule")
		.setDescription("Add a new rule to the rules")
		.addStringOption(option => option.setName("rule").setDescription("The rule to be added").setRequired(true))
		.setDefaultMemberPermissions(8192),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		const new_rule = (interaction.options.getString("rule"))!

		const rule = new Rule()
		rule.guild = interaction.guild?.id!
		AppDataSource.manager.save(rule)

		const rules = new Rules()
		rules.rule_string = new_rule
		AppDataSource.manager.save(rules)

		await interaction.reply({
			content: `\`${new_rule}\` succesfully added to rules`
		})
	}
}