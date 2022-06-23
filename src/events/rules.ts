import { ButtonInteraction, Message, MessageCollector } from "discord.js";
import 'dotenv/config'

module.exports = {
	name: "interactionCreate",
	once: false,
	async execute(interaction: ButtonInteraction) {
		if (!interaction.isButton()) return

		if (interaction.user.bot) return

		const role = interaction.guild?.roles.cache.get(process.env.verified_role!)

		try {
			await interaction.user.send("Did you read the rules")

			const collecor = new MessageCollector(interaction.user.dmChannel!, { time: 15000 })

			const member = interaction.guild?.members.cache.get(interaction.user.id)

			if (!role) {
				return interaction.user.send("Verified rule is not defined, please contact an administrator for more info")
			}

			collecor.on("collect", async message => {
				if (message.content.toLowerCase() == "yes") {
					await message.author.send("Succesfully verified friendly ship")
					await member?.roles.add(role)
				}
			})

			collecor.on("end", () => {
				console.log(`verified ${member?.displayName} in ${interaction.guild?.name} or maybe not`)
			})

		} catch (error) {
			console.error(error)
		}
	}
}