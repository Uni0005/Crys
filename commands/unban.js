const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 
const settings = require("../models/settings"); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription("Unban user")
       .addStringOption(option => option.setName('id').setDescription('User id').setRequired(true)),
	run: async ({client, interaction, args}) => {
      if(!interaction.member.permissions.has("BAN_MEMBERS", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
    	const userid = interaction.options.getString('id');
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
		interaction.guild.members.unban(userid, `${interaction.user.tag}`).then((user) => {
			const reply = new MessageEmbed ().setDescription(`${user} has been unbanned`);
			interaction.reply({embeds: [reply], ephemeral: true})
			const embed = new MessageEmbed()
			.setColor("GREEN")
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
			.setDescription(`**Member:** ${user} (${user.id})\n**Action:** Unbanned user\n**Actioned by:** ${interaction.user}`)
			.setTimestamp();

			(client.channels.cache.get(dbGuild.logId)).send({embeds: [embed]})
		}).catch(() => {
			interaction.reply({content: `Please specify a valid banned member's id`, ephemeral: true})
		})
    }
}