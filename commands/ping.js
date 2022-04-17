const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Just test'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};