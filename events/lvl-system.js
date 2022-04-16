const { mongo_uri } = require('../cfg.json')

const Levels = require("discord-xp");
Levels.setURL(mongo_uri);

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (!message.guild) return;
        if (message.author.bot) return;
        
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; 
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        if (hasLeveledUp) {
          const user = await Levels.fetch(message.author.id, message.guild.id);
          message.channel.send(`${message.author} только что получил ${user.level} уровень!. :tada:`);
        }
      });

    client.on('ready', () => {
        console.log('lvl system is ready!')
    })
}