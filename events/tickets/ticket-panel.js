const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');

module.exports = {
    name: 'ticket-panel',
    run: async (client, message, args, Discord) => {
        const tic = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(message.quild.name, message.quild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "__**Как я могу открыть тикет?**__"
            )
            .setTitle("Tickets")
        
        const btn = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("t-open")
                .setLabel("Open ticket!")
                .setStyle('PRIMARY')
                .setEmoji(':incoming_envelope:')
            );
        
            message.channel.send({
                embeds:[tic],
                components: [btn]
            })
    }   
}