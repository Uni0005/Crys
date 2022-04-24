const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Just test'),
	run: async({client, interaction, args}) => {
        const em = new MessageEmbed()   
            .setTitle('Пинг')
            .setFields(
                {
                name: 'Пинг Websocket',
                value: `Пинг Websocket - ${client.ws.ping}`,
                },
            )
            .setColor('GREEN');
        const msg = await interaction.deferReply({ fetchReply: true });
        interaction.editReply({embeds: [em] });
	},
};