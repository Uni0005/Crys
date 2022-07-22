const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Constants } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

const cfg = require('../cfg.json')
const settings = require("../models/settings"); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Sends message')
       	.addStringOption(option => option.setName('text').setDescription('Content').setRequired(true))
		.addStringOption(option => option.setName('reply').setDescription('Reply message'))
       	.addChannelOption(option => option
			.setName('channel')
			.setDescription('Choose channel')
			.addChannelTypes(Constants.ChannelTypes.GUILD_TEXT, 
				Constants.ChannelTypes.GUILD_NEWS,
				Constants.ChannelTypes.GUILD_NEWS_THREAD,
				Constants.ChannelTypes.GUILD_PRIVATE_THREAD, 
				Constants.ChannelTypes.GUILD_PUBLIC_THREAD
			)
		)
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
        
	run: async ({client, interaction, args}) => {
		if(!interaction.member.permissions.has("MANAGE_MESSAGES", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
		const channel = interaction.options.getChannel('channel') || interaction.channel;
		const msg = interaction.options.getString('text');
		const reply = interaction.options.getString('reply') || null;
       if(!channel.permissionsFor(interaction.guild.me)?.has("SEND_MESSAGES") && interaction.user.id !== cfg.daddy) return interaction.reply({content: `Sorry, but i cant do it`, ephemeral: true});
		
		if(!channel.permissionsFor(interaction.member)?.has("SEND_MESSAGES") && interaction.user.id !== cfg.daddy) return interaction.reply({content: `Sorry, but you don't have permissions`, ephemeral: true})
		
		const message = await channel.send({content: msg, reply: { messageReference: reply }, allowedMentions: {parse: ["users"]}});

     	interaction.reply({content: 'Message has been sent!', ephemeral: true});
                        
       	if (interaction.member.id == cfg.daddy) return;
       	const logging = new MessageEmbed()
       	.setTitle('User used say command.')
       	.setDescription(`${interaction.user} used the say command\n\n[Jump](${message.url})`)
       	.setFields(
        	{ name: 'Channel', value: `${channel}`}, 
          	{ name: 'Content', value: msg }
      	)
      	.setColor('#ff0000');
       
		const guildSettings = await settings.findOne({ guildId: interaction.guild.id });
		
		(client.channels.cache.get(guildSettings.logId)).send({embeds: [logging]})        
	}
};