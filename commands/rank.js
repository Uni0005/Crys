const Discord = require('discord.js')
const Levels = require("discord-xp");
const cfg = require('../cfg.json');
const backgroundsDB = require("../models/backgrounds"); 
const canvacord = require('canvacord');
const { SlashCommandBuilder } = require('@discordjs/builders');

Levels.setURL(cfg.mongo_uri);

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
		if (!user) return interaction.reply({ content: "This user has no levels."});
		if(user.level < 0) return interaction.reply("User have level less than zero");
		
		const pic = "https://media.discordapp.net/attachments/962263128253546517/967712659938099220/imgonline-com-ua-Resize-pH0lE5pLnrDff.jpg"
		const rank = new canvacord.Rank()
		.setAvatar(target.displayAvatarURL({format: 'png', size: 512}))
		.setBackground("IMAGE", pic)
		.setCurrentXP(user.xp)
		.setCustomStatusColor("PURPLE")
		.setRequiredXP(Levels.xpFor(user.level + 1))
		.setRank(user.position, 'Rank ') 
		.setLevel(user.level, 'LvL')
		.setProgressBar("#78dbe2", "COLOR")
		.setUsername(target.username)
		.setDiscriminator(target.discriminator)
		.setFontSize("30px");


		const card = await backgroundsDB.findOne({userId: target.id});
		
		if(card){
			rank
			.setBackground("IMAGE", card.backgroundURL)
			.setProgressBar(card.progressbar, "COLOR")
			.setCustomStatusColor(card.status)
			.setRankColor(card.progress);
		}
		
        rank.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            interaction.reply({files: [attachment], ephemeral: ep})
       });
	}
}
