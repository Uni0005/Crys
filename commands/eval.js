const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Formatters } = require('discord.js');
const cfg = require("../cfg.json"); 
const { inspect, format } = require("node:util");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription("evals provided code")
        .addStringOption(option => option.setName('code').setDescription('Code').setRequired(true)),
	run: async ({client, interaction}) => {
        if(interaction.user.id !== cfg.daddy && interaction.user.id !== cfg.syjalo) return interaction.reply({content: 'You cant use it', ephemeral: true});

        let code = interaction.options.getString('code');
        let execute = `(async () => {\n${code}\n})()`
        await interaction.deferReply();

        try {
            //const c = format(code.includes('await ') ? `(async () => {\n${code}\n})()` )
            const result = await eval(execute)
            let output = result;
            if(typeof result !== 'string') output = inspect(result)
            
            const firstTimestamp = Date.now(),
            timeSpent = `${(Date.now() - firstTimestamp).toLocaleString()}ms`;

            const embed = new MessageEmbed()
            .setAuthor({name: "Eval", iconURL: interaction.user.avatarURL()})
            .setTitle('The code was evaled successfully')
            .setFields([
                {
                    name: 'Input Code',
                    value: Formatters.codeBlock('js', `${code}`)
                },
                {
                    name: 'Eval result',
                    value: Formatters.codeBlock('js', `${output}`),
                },
                {
                    name: 'Time spent',
                    value: timeSpent,
                },
            ])
            .setColor("GREEN");
        
            await interaction.editReply({ embeds: [embed] });
            console.log(code)

            //interaction.reply({content: output, code: 'js'})
        } catch (error) {
            const embed = new MessageEmbed()
            .setAuthor({name: "Eval", iconURL: interaction.user.avatarURL()})
            .setTitle('An error occured while evaling provided code')
            .setFields([
                {
                    name: 'Input Code',
                    value: Formatters.codeBlock('js', `${code}`)
                },
                {
                    name: 'Error',
                    value: `${error}`,
                },
            ])
            .setColor("RED");

            interaction.editReply({embeds: [embed]})
        }
    }
}