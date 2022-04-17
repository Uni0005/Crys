const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Just test'),
	run: async({client, interaction, args}) => {
		interaction.reply({content: 'Pong!'});
	},
};