const Discord = require('discord.js')
const Levels = require("discord-xp");
const { mongo_uri } = require('../cfg.json');
const { day, night, forest } = require('../configs/backgrounds.json')

Levels.setURL(mongo_uri);
const canvacord = require('canvacord');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription("Get your rank or another member's rank")
        .addUserOption(option => option.setName('user').setDescription('Choose user'))
        .addBooleanOption(option => option.setName('ephemeral').setDescription('Ephemeral')),
	run: async ({client, interaction, args}) => {
        const target = interaction.options.getUser('user') || interaction.user;
        const user = await Levels.fetch(target.id, interaction.guild.id, true);
        const ep = interaction.options.getBoolean('ephemeral')
        var userd = interaction.guild.members.cache.get(target.id);
		if (!user) {
			return interaction.reply({ content: "This user has no levels."});
		} else{
			const rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
            .setCurrentXP(user.xp) 
            .setRequiredXP(Levels.xpFor(user.level + 1)) 
            .setRank(user.position) 
            .setLevel(user.level) 
            .setBackground("IMAGE", day)
            .setStatus('online', circle = false, width = 6) 
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

