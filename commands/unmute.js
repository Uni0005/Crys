const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/warningDB");
const settings = require("../models/settings"); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription("Unmute user")
       .addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true)),
	run: async ({client, interaction, args}) => {
      if(!interaction.member.permissions.has("MANAGE_MESSAGES", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
        
		const target = interaction.options.getUser("user")
       const user = await interaction.guild.members.cache.get(target.id);
		
		if(!user) return interaction.reply({content: 'Invalid user. You cannot unmute this user, because he isnt a member of the server', ephemeral: true})
     	
		if(user.communicationDisabledUntilTimestamp == null) return interaction.reply({content: 'Not muted user', ephemeral: true})


		user.timeout(null, `Removed by: ${interaction.user.tag}`)
		const reply = new MessageEmbed ().setDescription(`${target} has been unmuted`).setTimestamp();
		interaction.reply({embeds: [reply], ephemeral: true})
		
		const embed = new MessageEmbed()
		.setColor("GREEN")
		.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setDescription(`**Member:** ${target} (${target.id})\n**Action:** Unmuted user\n**Actioned by:** ${interaction.user}`)
		.setTimestamp();

		(client.channels.cache.get(dbGuild.logId)).send({embeds: [embed]})
    }
}