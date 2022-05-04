const { mongo_uri, enserver, ruserver } = require('../cfg.json')

const Levels = require("discord-xp");
Levels.setURL(mongo_uri);

module.exports = (client) => {
    client.on("messageCreate", async (message, interaction) => {
        if (!message.guild) return;
        if (message.author.bot) return;
        if (message.channel.id == "963710917961457675") return;
        if (message.channel.id == "835802833878122577") return;
        
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; 
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const member = message.author.id
        var userd = message.guild.members.cache.get(member);

        //New lvl
        if (hasLeveledUp) {
            //ru
            if (message.guild.id == ruserver){
                const channel = client.channels.cache.get('962265352975314974');
                channel.send(`${message.author} только что получил ${user.level} уровень! :tada:`);
            };
            
            //en
            if (message.guild.id == enserver){
                const channel = client.channels.cache.get('803502234930774078');
                channel.send(`${message.author} has reached level ${user.level}! :tada:`);
            }
        };
      });

    client.on('ready', () => {
        console.log('lvl system is ready!')
    })
}
