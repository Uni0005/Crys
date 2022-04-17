const Discord = require('discord.js')
const Levels = require("discord-xp");
const { mongo_uri } = require('../cfg.json');
Levels.setURL(mongo_uri);

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Узнай свой ранг или ранг другого пользователя!')
        .addUserOption(option => option.setName('user').setDescription('Выбери пользователя')),
	run: async ({client, interaction, args}) => {
        const target = interaction.options.getUser('user') || interaction.user;
        const user = await Levels.fetch(target.id, interaction.guild.id, true);
		if (!user) {
			return interaction.reply({ content: "Похоже этот пользователь не имеет даже первого лвла!"});
		} else {
			interaction.reply({content: `**${target.tag}** имеет ${user.level} лвл. Он занимает **${user.position}** место среди всех`});
		}
	},
};

