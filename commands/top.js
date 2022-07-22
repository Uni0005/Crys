const Discord = require('discord.js')
const Levels = require("discord-xp");
const { mongo_uri, ruserver, enserver} = require('../cfg.json');
Levels.setURL(mongo_uri);

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top')
		.setDescription('Top of 10 leaders by level')
		.setDefaultPermission(true),
	run: async ({client, interaction, args}) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10);
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
		//ru
		if (interaction.guild.id == ruserver){
			if (rawLeaderboard.length < 1) {
				return reply("Никого нет в топах.");
			} else {
				const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}**\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
				const lbe = new MessageEmbed().setTitle(`**Топ 10:**:`).setDescription(`\n\n${lb.join("\n")}`).setColor('#32CD32')
				interaction.reply({embeds: [lbe] });
			}
		};
		//en
		if (interaction.guild.id == enserver){
			if (rawLeaderboard.length < 1) {
				return reply("No one in the tops.");
			} else {
				const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}**\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
				const lbe = new MessageEmbed().setTitle(`**Top 10:**:`).setDescription(`\n\n${lb.join("\n")}`).setColor('#32CD32')
				interaction.reply({embeds: [lbe] });
			}
		}
		
	},
};