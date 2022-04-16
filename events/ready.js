module.exports = (client) => {
    const { MessageEmbed } = require('discord.js');
    const BotReady = new MessageEmbed().setTitle('Я снова в сети!').setColor('#32CD32')
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        const channel = client.channels.cache.get('927200393975463936');
        channel.send({ embeds: [BotReady] });
        client.user.setActivity('Порно с Винтером в главной роли', { type: 'WATCHING' });
        client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
        
            const command = client.commands.get(interaction.commandName);
        
            if (!command) return;
        
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });    
    });
}