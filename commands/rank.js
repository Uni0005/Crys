const Discord = require('discord.js')
const Levels = require("discord-xp");
const { mongo_uri } = require('../cfg.json');
Levels.setURL(mongo_uri);

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('qq')
        .addUserOption(option => option.setName('user').setDescription('Select a user')),
	run: async ({client, interaction, args}) => {
        const target = interaction.options.getUser('user') || interaction.user;
        const user = await Levels.fetch(target.id, interaction.guild.id);
		interaction.reply({content: `**${target.tag}** is currently level ${user.level}.`});
	},
};

