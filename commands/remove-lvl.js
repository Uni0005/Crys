const { SlashCommandBuilder } = require('@discordjs/builders');
const Levels = require("discord-xp");
const { MessageEmbed } = require('discord.js');
    
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-level')
		.setDescription('Removing levels for the use')
        .addUserOption(option => option.setName('user').setDescription('Выбери пользователя').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Кол-во лвлов').setRequired(true)),
	run: async ({client, interaction, args}) => {
        if (interaction.member.permissions.has("MANAGE_WEBHOOKS", true)){
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
                Levels.subtractLevel(user, interaction.guild.id, xpam)

                interaction.reply({content: `Уровень ${target} был изменён на ${xpam}`, ephemeral: true});

                const log = client.channels.cache.get(rulog);
                const slog = new MessageEmbed()
                    .setTitle('User used admin command.')
                    .setDescription(`${interaction.user} использовал команду "set-level"`)
                    .setFields(
                        { name: 'Removed for:', value: `${target}`}, 
                        { name: 'Removed to:', value: `${xpam}` }
                    )
                    .setColor('#ff0000')
                log.send({ embeds: [slog] });
            };
            //en
            if (interaction.guild.id == enserver){
                if (xpam<1){
                    interaction.reply({content: 'You cannot remove a level if it is less than 0', ephemeral: true})
                    return
                } 
                Levels.subtractLevel(user, interaction.guild.id, xpam)
                interaction.reply({content: `Levels (${xpam}) for ${target} have been removed`, ephemeral: true});

                const log = client.channels.cache.get(enlog);
                const slog = new MessageEmbed()
                    .setTitle('User used admin command.')
                    .setDescription(`${interaction.user} used "add-level"`)
                    .setFields(
                        { name: 'Removed for:', value: `${target}`}, 
                        { name: 'Removed to:', value: `${xpam}` }
                    )
                    .setColor('#ff0000')
                log.send({ embeds: [slog] });
            };
    
        } else {
            interaction.reply({content: "You dont have enough permissions", ephemeral: true})
        };
	},
};