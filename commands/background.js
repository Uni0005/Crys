const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 

const db = require("../models/backgrounds");
const settings = require("../models/settings"); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription("test cmd")
       	.addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true))
       	.addStringOption(option => option.setName('background').setDescription('Reason').setRequired(true))
		.addStringOption((option) => option.setName('progress').setDescription('Color for progress bar'))
		.addStringOption((option) => option.setName('status').setDescription('Color for status')),
	run: async ({client, interaction, args}) => {
		if(interaction.user.id !== cfg.daddy) return interaction.reply({content: "Only for Kremix", ephemeral: true});
		
		const target = interaction.options.getUser('user');
		const url = interaction.options.getString('background');
		const progress = interaction.options.getString('progress');
		const status = interaction.options.getString('status');
		
		let card = await db.findOne({userId: target.id}) 
		
		if(!card){
			new db({
				userId: target.id, 
				backgroundURL: url, 
				progressbar: progress, 
				status: status
			}).save();
			
			interaction.reply({content: `saved`})
		} else {
			await db.updateOne({userId: target.id}, {$set: {userId: target.id, backgroundURL: url, progressbar: progress, status: status}})
			interaction.reply({content: `saved`})
		}
	}
}