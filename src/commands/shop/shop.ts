import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed, Role } from "discord.js";
import { AppDataSource } from "../../database/appdata";
import { Players } from "../../database/entities/players";
import { Shop } from "../../database/entities/shop";
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('show the store embed to purchase roles'),
	async execute(interaction: CommandInteraction) {
		if (interaction.user.bot) return

		const getEntry = await AppDataSource
			.getRepository(Shop)
			.createQueryBuilder()
			.getMany()

		if (!getEntry) {
			return await interaction.reply({
				content: "The shop doesn't have any items yet!! Ask a moderator to add roles to the shop if you want to obtain them!",
				ephemeral: true
			})
		}

		const embed = new MessageEmbed()
			.setColor('#42b983')
			.setTitle('Shop')
			.setDescription('All the roles you can buy using the server currency')

		const row = new MessageActionRow()

		const customIDs: string[] = []
		const roleOrgins: Role[] = []

		getEntry.forEach(entry => {
			const role = interaction.guild?.roles.cache.find(r => r.id === entry.role)!

			embed.addField(`${role?.name}`, `${role}: ${entry.price}`, false)

			customIDs.push(role?.name)
			roleOrgins.push(role)

			row.addComponents(
				new MessageButton()
					.setCustomId(role?.name)
					.setLabel(role?.name)
					.setStyle('SUCCESS')
			)
		})

		await interaction.reply({
			embeds: [embed],
			components: [row]
		})

		const filter = (i: MessageComponentInteraction): boolean => {
			if (!i.isButton()) return false

			for (const id in customIDs) {
				if (customIDs[id] == i.customId) {
					return true
				}
			}

			return false

		}

		const collector = interaction.channel?.createMessageComponentCollector({
			filter,
			time: 30000
		})

		collector?.on('collect', async i => {
			await i.deferUpdate()
			for (var num = 0; num < customIDs.length; num++) {
				if (customIDs[num] === i.customId) {

					const getUser = await AppDataSource
						.getRepository(Players)
						.createQueryBuilder("user")
						.where('user.id = :id', { id: i.user.id })
						.getOne()

					if (!getUser) {
						await i.channel?.send({
							content: 'Please join the game using join before using this!'
						})
						return
					}

					const getRole = await AppDataSource
						.getRepository(Shop)
						.createQueryBuilder("shop")
						.where("shop.role = :role", { role: roleOrgins[num].id })
						.getOne()

					if (!getRole) return

					if (getUser.balance < getRole.price) {
						await i.channel?.send({
							content: `You are short by ${getRole.price - getUser.balance}`
						})
						return
					}

					const new_balance = getUser.balance - getRole.price

					const member = i.guild?.members.cache.find(mem => mem.id === i.user.id)

					member?.roles.add(roleOrgins[num])

					await i.channel?.send({
						content: `Succesfully gave you the role ${roleOrgins[num]}`
					})

					try {
						await AppDataSource
							.createQueryBuilder()
							.update(Players)
							.set({
								balance: new_balance
							})
							.where("id = :id", { id: interaction.user.id })
							.execute()
					} catch (error) {
						console.error(error)
					}

					await wait(2000)
				}
			}
		})

		collector?.on('end', async () => {
			await interaction.editReply({
				content: "Shop session has timed out",
				components: [],
				embeds: []
			})
		})
	}
}