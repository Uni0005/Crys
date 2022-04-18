const Discord = require('discord.js')
const Levels = require("discord-xp");
const { mongo_uri } = require('../cfg.json');
Levels.setURL(mongo_uri);

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top')
		.setDescription('Топ 10 лидеров!'),
	run: async ({client, interaction, args}) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10);
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
		if (rawLeaderboard.length < 1) {
			return reply("Никого нет в топах.");
		} else {
            const lb = leaderboard.map(e => `**${e.position}. ${e.username}#${e.discriminator}**\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
			const lbe = new MessageEmbed().setTitle(`**Топ 10:**:`).setDescription(`\n\n${lb.join("\n")}`).setColor('#32CD32')
			// interaction.reply({content: `**Топ 10:**:\n\n${lb.join("\n")}`});
			interaction.reply({embeds: [lbe] });
		}
	},
};