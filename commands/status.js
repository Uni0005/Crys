const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Formatters } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription("Bot's status"),
	run: async({client, interaction, args}) => {
        const timestamp = Math.floor(client.readyTimestamp / 1000);
        const firstTimestamp = Date.now();
        await interaction.deferReply();

        const em = new MessageEmbed()   
            .setTitle('Ping')
            .setFields(
                { name: 'Ping Websocket', value: `Ping Websocket - ${client.ws.ping}` },
                { name: 'Bot ping', value: `Bot's ping - ${(Date.now() - firstTimestamp).toLocaleString()} ms` },
                { name: 'Uptime', value: `Uptime:  ${Formatters.time(timestamp)} (${Formatters.time(timestamp, 'R')})` },
            )
            .setColor('GREEN');

        interaction.editReply({embeds: [em] });
	},
};