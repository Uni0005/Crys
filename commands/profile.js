const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Formatters } = require('discord.js');
const Levels = require("discord-xp");
const cfg = require('../cfg.json'); 
const punishments = require("../models/warningDB");

Levels.setURL(cfg.mongo_uri);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription("Gives member's server profile")
		.addUserOption(option => option.setName('user').setDescription('Choose user')),
	run: async ({client, interaction}) => {
		if(interaction.user.id !== "920325546200694905") return interaction.reply({content: 'You cant use it!'})
		const user = interaction.options.getUser('user') || interaction.user;
		const member = await interaction.guild.members.fetch(user).catch(() => null)
		
		const user_level = await Levels.fetch(user.id, interaction.guild.id, true);
		const embed = new MessageEmbed()
		.setTitle(`${user.username}'s Profile`)
		.setDescription(`${user} ${Formatters.inlineCode(user.tag)} (${user.id})`)
		.setThumbnail(member?.displayAvatarURL({ size: 4096 }) || user.displayAvatarURL({ size: 4096 }))
		.setColor(member?.displayColor || "GREY");
		
		if(user_level) embed.addFields({ name: 'Rank Stats', value: `Level: ${user_level.level}\nXp: ${user_level.xp}\nTop position: ${user_level.position}`});
		
		
			
		interaction.reply({embeds: [embed]})
	}
}