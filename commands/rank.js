const Discord = require('discord.js')
const Levels = require("discord-xp");
const { mongo_uri, back, night } = require('../cfg.json');
Levels.setURL(mongo_uri);
const canvacord = require('canvacord');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription("Get your rank or another member's rank")
        .addUserOption(option => option.setName('user').setDescription('Выбери пользователя'))
        .addBooleanOption(option => option.setName('ephemeral').setDescription('test funtion')),
	run: async ({client, interaction, args}) => {
        const target = interaction.options.getUser('user') || interaction.user;
        const user = await Levels.fetch(target.id, interaction.guild.id, true);
        const ep = interaction.options.getBoolean('ephemeral')
		if (!user) {
			return interaction.reply({ content: "Apparently this user hav no levels"});
		} else{
			const rank = new canvacord.Rank() // Build the Rank Card
            .setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
            .setCurrentXP(user.xp) // Current User Xp
            .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
            .setRank(user.position) // Position of the user on the leaderboard
            .setLevel(user.level) // Current Level of the user
            .setBackground("IMAGE", night)
            .setStatus('streaming', circle = false, width = 6) 
            .setProgressBar("#78dbe2", "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

        rank.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            if (ep == true){
                interaction.reply({files: [attachment], ephemeral: true});
                return
            } else {
                interaction.reply({ files: [attachment] });
            }
        });
		}
	},
};

