const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription("Bot's status"),
	run: async({client, interaction, args}) => {
        const em = new MessageEmbed()   
            .setTitle('Ping')
            .setFields(
                {
                name: 'Ping Websocket',
                value: `Ping Websocket - ${client.ws.ping}`,
                },
            )
            .setColor('GREEN');
        const msg = await interaction.deferReply({ fetchReply: true });
        interaction.editReply({embeds: [em] });
	},
};