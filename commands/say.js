const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { daddy, rulog, enlog, ruserver, enserver } = require('../cfg.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Sends message')
                .addStringOption(option => option.setName('text').setDescription('Content').setRequired(true))
                .addChannelOption(option => option.setName('channel').setDescription('Choose channel'))
                .addStringOption(option => option.setName('reply').setDescription('Reply message'))
                .setDefaultPermission(true),
        
	run: async ({client, interaction, args}) => {
                 if (interaction.member.permissions.has("MANAGE_MESSAGES", true)) {
                        const channel = interaction.options.getChannel('channel') || interaction.channel;
                        const msg = interaction.options.getString('text');
                        const reply = interaction.options.getString('reply') || null
                        
                        const message = await channel.send({content: msg, reply: { messageReference: reply }});
                        //ru
                        if (interaction.guild.id == ruserver){
                            interaction.reply({content: 'Сообщение успешно отправлено!', ephemeral: true});
                        
                            if (interaction.member.id == daddy) return;
                            else{
                                    const au = interaction.user
                                    const log = client.channels.cache.get(rulog);
                                    const saye = new MessageEmbed()
                                        .setTitle('User used say command.')
                                        .setDescription(`${interaction.user} использовал команду say\n\n[Jump](${message.url})`)
                                        .setFields(
                                            { name: 'Чат', value: `${channel}`}, 
                                            { name: 'Content', value: msg }
                                        )
                                        .setColor('#ff0000')
                                    log.send({ embeds: [saye] });
                            }
                        };
                        //en
                        if (interaction.guild.id == enserver){
                            interaction.reply({content: 'Message has been sent!', ephemeral: true});
                        
                            if (interaction.member.id == daddy) return;
                            else{
                                    const au = interaction.user
                                    const log = client.channels.cache.get(enlog);
                                    const saye = new MessageEmbed()
                                        .setTitle('User used say command.')
                                        .setDescription(`${interaction.user} used the say command\n\n[Jump](${message.url})`)
                                        .setFields(
                                            { name: 'Channel', value: `${channel}`}, 
                                            { name: 'Content', value: msg }
                                        )
                                        .setColor('#ff0000')
                                    log.send({ embeds: [saye] });
                            }
                        };

                } else {
                    interaction.reply({content: "You dont have enough permissions", ephemeral: true})
                };
                },
};