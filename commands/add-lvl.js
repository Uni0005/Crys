const { SlashCommandBuilder } = require('@discordjs/builders');
const Levels = require("discord-xp");
const { MessageEmbed } = require('discord.js');
const { rulog, enlog, ruserver, enserver,daddy } = require('../cfg.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-level')
		.setDescription('Adding levels for the user')
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
                Levels.appendLevel(user, interaction.guild.id, xpam)

                interaction.reply({content: `Уровени (${xpam}) для ${target} были добавлены`, ephemeral: true});

                const log = client.channels.cache.get(rulog);
                const slog = new MessageEmbed()
                    .setTitle('User used admin command.')
                    .setDescription(`${interaction.user} использовал команду "add-level"`)
                    .setFields(
                        { name: 'Added for:', value: `${target}`}, 
                        { name: 'Added levels:', value: `${xpam}` }
                    )
                    .setColor('#ff0000')
                log.send({ embeds: [slog] });
            };
            //en
            if (interaction.guild.id == enserver){
                if (xpam<1){
                    interaction.reply({content: 'You cannot add a level if it is less than 0', ephemeral: true})
                    return
                } 
                Levels.appendLevel(user, interaction.guild.id, xpam)
                interaction.reply({content: `Levels (${xpam}) for ${target} have been added`, ephemeral: true});

                const log = client.channels.cache.get(enlog);
                const slog = new MessageEmbed()
                    .setTitle('User used admin command.')
                    .setDescription(`${interaction.user} used "add-level"`)
                    .setFields(
                        { name: 'Added for:', value: `${target}`}, 
                        { name: 'Added levels:', value: `${xpam}` }
                    )
                    .setColor('#ff0000')
                log.send({ embeds: [slog] });
            };
        } else {
            interaction.reply({content: "You dont have enough permissions", ephemeral: true})
        };
	},
};