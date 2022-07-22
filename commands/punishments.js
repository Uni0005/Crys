const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/warningDB");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('punishments')
		.setDescription("Check user's punishments")
        .addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true)),
	run: async ({client, interaction, args}) => {
      
      	const target = interaction.options.getUser("user")
		let user = await client.users.fetch(target.id).catch(() => null);

      	let c = await db.find({guildId: interaction.guild.id, userId: target.id})
		let mutes = await db.find({guildId: interaction.guild.id, userId: target.id, type: "mute"}).count()
		let warns = await db.find({guildId: interaction.guild.id, userId: target.id, type: "warn"}).count()
		let kicks = await db.find({guildId: interaction.guild.id, userId: target.id, type: "kick"}).count()
		let ban = await db.find({guildId: interaction.guild.id, userId: target.id, type: "ban"}).count()
		let bans = await db.find({guildId: interaction.guild.id, userId: target.id, type: "temp-ban"}).count() + ban;
		
      	if(!c?.length){
        	const nopunishments = new MessageEmbed() 
        	.setDescription('This user has no punishments!')
        	.setColor("BLUE");

			if(!user) nopunishments.setAuthor({ name: "Deleted User", iconURL: "https://images.app.goo.gl/e5AEDW5v4L4t2gSp6"})
			else nopunishments.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })})
      
        	return interaction.reply({embeds: [nopunishments]})
      	}
		
		await interaction.deferReply({ fetchReply: true });

		const pages = [[]];
		for (let i = 0; i < c.length; i++)
			(i + 1) % 10 === 0 ? pages.push([c[i]]) : pages.at(-1).push(c[i]);

		const makePageEmbed = (pageNameData, pageCount, pageIndex) => {
			const embed = new MessageEmbed()
			.setFields([
				...pageNameData.map((cases) => ({
				name: `Case ${cases.case} - ${cases.type}`,
				value: cases.reason
				})),
			])
			.setColor("BLUE")
			.setFooter({text: `Warned: ${warns} | Muted: ${mutes} | Kicked: ${kicks} | Banned: ${bans}`});

			if (pageCount > 1)
			embed.setFooter({
				text: `Page ${pageIndex + 1}/${pageCount} | Warned: ${warns} | Muted: ${mutes} | Kicked: ${kicks} | Banned: ${bans}`
			});

			if(!user) embed.setAuthor({ name: "Deleted User", iconURL: "https://images.app.goo.gl/e5AEDW5v4L4t2gSp6"})
			else embed.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true })});

			return embed;
		};

		const makePageComponents = (pageCount, pageIndex) => {
			return new MessageActionRow().addComponents([
			  new MessageButton()
				.setCustomId(`scroll:${pageIndex - 1}`)
				.setLabel("Previous page")
				.setEmoji({ name: '◀️' })
				.setStyle("PRIMARY")
				.setDisabled(pageIndex < 0 || pageIndex === 0),
			  new MessageButton()
				.setCustomId(`scroll:${pageIndex + 1}`)
				.setLabel("Next page")
				.setEmoji({ name: '▶️' })
				.setStyle("PRIMARY")
				.setDisabled(pageIndex < 0 || pageIndex === pageCount - 1),
			]);
		  };

		const makeMessageOptions = (pages, pageIndex) => ({
			embeds: [makePageEmbed(pages[pageIndex], pages.length, pageIndex)],
			components: pages.length > 1 ? [makePageComponents(pages.length, pageIndex)] : undefined,
			fetchReply: true,
		});

		const message = await interaction.editReply(makeMessageOptions(pages, 0));
		
		if (pages.length < 2) return;

		const collector = message.createMessageComponentCollector({ idle: 150000 });

		collector.on('collect', async (buttonInteraction) => {
		if (buttonInteraction.user.id === interaction.user.id) {
			const [action, pageIndex] = buttonInteraction.customId.split(':');
			switch (action) {
			case 'scroll':
				await buttonInteraction.update(makeMessageOptions(pages, +pageIndex));
				break;
			}
		} else return interaction.reply({content: `You cant do it`, ephemeral: true})
		});

		collector.once('end', async () => {
			await interaction.editReply({ components: [makePageComponents(pages.length, -1)] });
		});
   }
}