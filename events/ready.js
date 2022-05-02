module.exports = (client) => {
    const { MessageEmbed } = require('discord.js');
    const { enlog } = require('../cfg.json')
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity('Minecraft with Crystal', { type: 'PLAYING' });
        const ac = client.channels.cache.get(enlog);
        const BotReady = new MessageEmbed().setTitle("I'm online again!").setColor('#32CD32')
        ac.send({ embeds: [BotReady] })
        client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
        
            const command = client.commands.get(interaction.commandName);
            const applicationCommand = await client.guilds.cache.get('962622208138682398')?.commands.fetch('962263126647144449');
        
            if (!command) return;

            try {
                await command.run({ client, interaction });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    });


}