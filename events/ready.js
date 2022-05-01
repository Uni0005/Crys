module.exports = (client) => {
    const { MessageEmbed, ApplicationCommandPermissionData,
        ApplicationCommandPermissionType } = require('discord.js');
    const BotReady = new MessageEmbed().setTitle('Я снова в сети!').setColor('#32CD32')
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity('Supernatural', { type: 'WATCHING' });
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