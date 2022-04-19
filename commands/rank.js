const Discord = require('discord.js')
const Levels = require("discord-xp");
const { mongo_uri } = require('../cfg.json');
Levels.setURL(mongo_uri);
const canvacord = require('canvacord');

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
		} else{
			const rank = new canvacord.Rank() // Build the Rank Card
            .setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
            .setCurrentXP(user.xp) // Current User Xp
            .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
            .setRank(user.position) // Position of the user on the leaderboard
            .setLevel(user.level) // Current Level of the user
            .setStatus('streaming', circle = false, width = 9) 
            .setProgressBar("#78dbe2", "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

        rank.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            interaction.reply({ files: [attachment] });
        });
		}
	},
};

