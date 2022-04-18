const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { daddy } = require('../cfg.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('qq')
                .addStringOption(option => option.setName('text').setDescription('Введите текст').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Выбери канал'))
                .addStringOption(option => option.setName('reply').setDescription('Ответ на сообщение'))
                .setDefaultPermission(true),
        
	run: async ({client, interaction, args}) => {
                 if (interaction.member.permissions.has("MANAGE_MESSAGES", true)) {
                        const channel = interaction.options.getChannel('channel') || interaction.channel;
                        const msg = interaction.options.getString('text');
                        const reply = interaction.options.getString('reply') || null
                        channel.send({content: msg, reply: { messageReference: reply }});
                        interaction.reply({content: 'Сообщение отправлено', ephemeral: true})

                        if (interaction.member.id == daddy) return;
                        else{
                                const au = interaction.user
                                const log = client.channels.cache.get('962312113525755904');
                                const saye = new MessageEmbed().setTitle(`${au.tag} заставил меня сказать '${msg}'`)
                                log.send({ embeds: [saye] });
                        }
                } else {
                    interaction.reply({content: "Недостаточно прав", ephemeral: true})
                };
                },
};