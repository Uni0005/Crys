const { SlashCommandBuilder } = require('@discordjs/builders');
const Levels = require("discord-xp");
const { MessageEmbed } = require('discord.js');
const settings = require("../models/settings"); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-level')
		.setDescription('Setting levels for the user')
        .addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Lvls amount').setRequired(true)),
	run: async ({client, interaction, args}) => {
		const guildSettings = await settings.findOne({ guildId: interaction.guild.id }); 
        if(!interaction.member.roles.cache.has(guildSettings.bot_manager) && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});

     	const xpam = interaction.options.getInteger('amount');
        const target = interaction.options.getUser('user');
        const user = (target.id);

		if(xpam < 1) return interaction.reply({content: 'You cannot add a level if it is less than 0', ephemeral: true}); 
		
       Levels.setLevel(user, interaction.guild.id, xpam)

       	const logging = new MessageEmbed()
       	.setTitle('User used admin command.')
       	.setDescription(`${interaction.user} used "add-level"`)
       	.setFields(
       		{ name: 'User:', value: `${target}`}, 
           { name: 'Changed to:', value: `${xpam}` }
      	)
       	.setColor('#ff0000');
		
		
		(client.channels.cache.get(guildSettings.logId)).send({embeds: [logging]})
		
		interaction.reply({content: `${target}'s level has been changed to ${xpam}`, ephemeral: true});
	}
};