const { SlashCommandBuilder } = require('@discordjs/builders');
const Levels = require("discord-xp");
const { MessageEmbed } = require('discord.js');
const { rulog, enlog, ruserver, enserver, daddy,testserver } = require('../cfg.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-level')
		.setDescription('Setting levels for the user')
        .addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Lvls amount').setRequired(true)),
	run: async ({client, interaction, args}) => {
        if (interaction.member.permissions.has("ADMINISTRATOR", true) | interaction.member.id == daddy){
            const xpam = interaction.options.getInteger('amount');
            const target = interaction.options.getUser('user');
            const user = (target.id);

            //ru
            if (interaction.guild.id == ruserver){
                //check
                if (xpam<1){
                    interaction.reply({content: 'Вы не можете добавить уровень меньше нуля', ephemeral: true})
                    return
                } 
                Levels.appendXp(user, interaction.guild.id, 10)
                Levels.setLevel(user, interaction.guild.id, xpam)
                interaction.reply({content: `Уровень ${target} был изменён на ${xpam}`, ephemeral: true});

                const log = client.channels.cache.get(rulog);
                const slog = new MessageEmbed()
                    .setTitle('User used admin command.')
                    .setDescription(`${interaction.user} использовал команду "set-level"`)
                    .setFields(
                        { name: 'User:', value: `${target}`}, 
                        { name: 'Changed to:', value: `${xpam}` }
                    )
                    .setColor('#ff0000')
                log.send({ embeds: [slog] });
            };
            //en
            if (interaction.guild.id == testserver){
                if (xpam<1){
                    interaction.reply({content: 'You cannot set a level if it is less than 0', ephemeral: true})
                    return
                } 
                Levels.appendXp(user, interaction.guild.id, 10)
                Levels.setLevel(user, interaction.guild.id, xpam)
                interaction.reply({content: `${target}'s level has been changed to ${xpam} for ${target}`, ephemeral: true});

                const log = client.channels.cache.get(enlog);
                const slog = new MessageEmbed()
                    .setTitle('User used admin command.')
                    .setDescription(`${interaction.user} used "add-level"`)
                    .setFields(
                        { name: 'User:', value: `${target}`}, 
                        { name: 'Changed to:', value: `${xpam}` }
                    )
                    .setColor('#ff0000')
                log.send({ embeds: [slog] });
            };
        } else {
            interaction.reply({content: "You dont have enough permissions", ephemeral: true})
        };
	},
};