const { VoiceChannel } = require("discord.js");

module.exports = (client) => {
    client.on('VoiceConnection', async (message) => {
        if (VoiceChannel.id == "926830520174792737") {
            const channel = client.channels.cache.get('926830520174792737');
            channel.send("qq");    
        }
    });
}
