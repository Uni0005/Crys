const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('qq'),
	run: async ({client, interaction, args}) => {
        if (interaction.member.permissions.has("ADMINISTRATOR", true)){
            interaction.reply({content: "<@920325546200694905>", mentions: false})
        } else {
            interaction.reply({content: "Недостаточно прав", ephemeral: true})
        };
	},
};