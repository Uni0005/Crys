const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/warningDB");
const settings = require("../models/settings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reason')
		.setDescription("Edit the reason of a punishment")
        .addStringOption(option => option.setName('case').setDescription('Case Number').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('New reason').setRequired(true)),
	run: async ({client, interaction, args}) => {
      if(!interaction.member.permissions.has("MANAGE_MESSAGES", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
     	const caseid = interaction.options.getString('case');
       const reason = interaction.options.getString('reason');
       let c = await db.findOne({guildId: interaction.guild.id, case: caseid})
       if(!c) return interaction.reply({content: "invalid case"})
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
		
       	let oldreason = c.reason
       	let update = await db.updateOne({guildId: interaction.guild.id, case: caseid}, {$set: {reason: reason}})
      	if(!c) return interaction.reply({content: "invalid case"})

       	const embed = new MessageEmbed()
		.setColor("GREEN")
		.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setDescription(`**Case:** ${c.case} (${interaction.user.id})\n**Action:** Edit reason\n**Actioned by:** ${interaction.user}\n**Old reason:** ${oldreason}\n**New reason:** ${reason}`)
		.setFooter({text: `Case: #${c.case}`})
		.setTimestamp();
		(client.channels.cache.get(dbGuild.logId)).send({embeds: [embed]})
		let message = await (client.channels.cache.get(dbGuild.verdictId)).messages.fetch(c.vid).then((message) => {
		const pun = new MessageEmbed(message.embeds[0])
		.spliceFields(2, 1, {name: `Reason:`, value: `${reason}`})
		 
		message.edit({embeds: [pun]})
		})
		 .catch(() => null)
		
		 interaction.reply({content: `Reason was edited`, ephemeral: true})
    }
}