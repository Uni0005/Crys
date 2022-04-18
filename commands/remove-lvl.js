const { SlashCommandBuilder } = require('@discordjs/builders');
const Levels = require("discord-xp");
const { MessageEmbed } = require('discord.js');
    
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-level')
		.setDescription('Удаление уровней у участника')
        .addUserOption(option => option.setName('user').setDescription('Выбери пользователя').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Кол-во лвлов').setRequired(true)),
	run: async ({client, interaction, args}) => {
        if (interaction.member.permissions.has("ADMINISTRATOR", true)){
            const xpam = interaction.options.getInteger('amount');
            const target = interaction.options.getUser('user');
            const user = (target.id);

            Levels.subtractLevel(user, interaction.guild.id, xpam)

            interaction.reply({content: `${target.tag} лишился ${xpam} уровней.`})

            const channel = client.channels.cache.get('962312113525755904');
            const admin = interaction.user
            const removelvl = new MessageEmbed().setTitle(`**${admin.tag}** забрал ${xpam} уровня(-ней) у ${target.tag}`).setColor('#32CD32')
            channel.send({ embeds: [removelvl] });
    
        } else {
            interaction.reply({content: "Недостаточно прав", ephemeral: true})
        };
	},
};