const { SlashCommandBuilder } = require('@discordjs/builders');
const Levels = require("discord-xp");
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-level')
		.setDescription('Установить уровень для пользователя')
        .addUserOption(option => option.setName('user').setDescription('Выбери пользователя').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Кол-во лвлов').setRequired(true)),
	run: async ({client, interaction, args}) => {
        if (interaction.member.permissions.has("ADMINISTRATOR", true)){
            const xpam = interaction.options.getInteger('amount');
            const target = interaction.options.getUser('user');
            const user = (target.id);

            Levels.setLevel(user, interaction.guild.id, xpam)

            interaction.reply({content: `Уровень ${target.tag} был изменён на ${xpam}.`})

            const channel = client.channels.cache.get('962312113525755904');
            const admin = interaction.user
            const setlvl = new MessageEmbed().setTitle(`**${admin.tag}** изменил уровень ${target.tag} на ${xpam}`).setColor('#32CD32')
            channel.send({ embeds: [setlvl] });
        } else {
            interaction.reply({content: "Недостаточно прав", ephemeral: true})
        };
	},
};