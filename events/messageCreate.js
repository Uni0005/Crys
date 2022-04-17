module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.channel.id == "944753576486526977" && !message.author.bot) {
            message.startThread( {
                name: `[${message.member.displayName}] Suggention Discussion`
            }).then((thread) => {
    
            })
            message.react(message.guild.emojis.cache.get('958044291287117906')), 
            message.react(message.guild.emojis.cache.get('958045326814642287'))
      .catch(console.error);
        }
    });
}
