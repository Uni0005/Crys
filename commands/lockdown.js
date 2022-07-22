const { SlashCommandBuilder } = require('@discordjs/builders');
const settings = require("../models/settings");
const { MessageEmbed, Constants } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lockdown')
		.setDescription('Lockdown a channel')
       	.addChannelOption(option => option
			.setName('channel')
			.setDescription('Choose channel')
			.addChannelTypes(Constants.ChannelTypes.GUILD_TEXT, 
				Constants.ChannelTypes.GUILD_NEWS,
				Constants.ChannelTypes.GUILD_NEWS_THREAD,
				Constants.ChannelTypes.GUILD_PRIVATE_THREAD, 
				Constants.ChannelTypes.GUILD_PUBLIC_THREAD
			))
		.addBooleanOption(option => option.setName('lockdowned').setDescription('True - lockdown, False - unlock')),
	run: async ({client, interaction, args}) => {
   		if (!interaction.member.permissions.has("MANAGE_MESSAGES", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
		const channel = interaction.options.getChannel('channel') || interaction.channel;
		const lock = interaction.options.getBoolean('lockdowned');
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
		if(!channel.permissionsFor(interaction.guild.me)?.has("MANAGE_CHANNELS")) return interaction.reply({content: `Sorry, but i cant do it`, ephemeral: true})
		
		if(lock == false){
			channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {SEND_MESSAGES: null});
		   
			const embed = new MessageEmbed() 
			.setColor("GREEN")
		 	.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		 	.setDescription(`**Channel:** ${channel} (${channel.id})\n**Action:** Unlock channel\n**Actioned by:** ${interaction.user} (${interaction.user.id})`)
		 	.setTimestamp();
				
			(client.channels.cache.get(dbGuild.logId)).send({embeds: [embed]})
			return interaction.reply({content: `${channel} has been unlocked`});
			};
			
		channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {SEND_MESSAGES: false});
		   
		const embed = new MessageEmbed() 
		.setColor("GREEN")
		.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		 .setDescription(`**Channel:** ${channel} (${channel.id})\n**Action:** Locked channel\n**Actioned by:** ${interaction.user} (${interaction.user.id})`)
		 .setTimestamp();
		(client.channels.cache.get(dbGuild.logId)).send({embeds: [embed]})
		interaction.reply({content: `${channel} has been locked down`});
   },
};