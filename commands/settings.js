const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, ChannelType } = require('discord.js');
const settings = require("../models/settings"); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('gg')
		.addStringOption(option =>
		option.setName('category')
			.setDescription('v')
			.setRequired(true)
			.addChoices(
				{ name: 'Log', value: 'logId' },
				{ name: 'Verdict', value: 'verdictId' },
				{ name: 'Bot Manager Role', value: 'bot_manager'}, 
				{ name: "Special bot's log", value: "speciallogId"}, 
				{ name: "Rank channel", value: "rankId"}
			)) 
		.addStringOption(option =>
		option.setName('id')
			.setDescription('New id for your choice')
			.setRequired(true)),
        
	run: async ({client, interaction, args}) => {
		const guildSettings = await settings.findOne({ guildId: interaction.guild.id }); 
	
		if(!guildSettings) new settings({guildId: interaction.guild.id}).save()
		
		if(!interaction.member.roles.cache.has(guildSettings.bot_manager) && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
		
		const id = interaction.options.getString('id');
		const type = interaction.options.getString('category');
		
		const role = interaction.guild.roles.cache.find(role => role.id === id);
		const channel = interaction.guild.channels.cache.get(id)
		
		if(type == "bot_manager" && !role) return interaction.reply({content: 'Invalid role id', ephemeral: true}) 
		else if(!channel && type !== "bot_manager") return interaction.reply({content: 'Invalid channel id', ephemeral: true});
		
		if(type == "logId"){
			await settings.updateOne({guildId: interaction.guild.id}, {$set: {logId: id}});
			(client.channels.cache.get(guildSettings.speciallogId)).send({content: `New log channel has been saved`})
		} else if(type == "verdictId"){
			await settings.updateOne({guildId: interaction.guild.id}, {$set: {verdictId: id}});
			(client.channels.cache.get(guildSettings.speciallogId)).send({content: `New verdict channel has been saved`})
		} else if(type == "bot_manager"){
			await settings.updateOne({guildId: interaction.guild.id}, {$set: {bot_manager: id}});
			(client.channels.cache.get(guildSettings.speciallogId)).send({content: `New bot manager role has been saved`})
		} else if(type == "speciallogId"){
			await settings.updateOne({guildId: interaction.guild.id}, {$set: {speciallogId: id}});
		} else if(type == "rankId"){
			await settings.updateOne({guildId: interaction.guild.id}, {$set: {rankId: id}});
			(client.channels.cache.get(guildSettings.speciallogId)).send({content: `New ranks channel has been saved`})
		}
		
		interaction.reply({content: `Your changes was been saved`, ephemeral: true})
	}
}