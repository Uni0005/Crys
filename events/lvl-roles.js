const { mongo_uri, enserver, ruserver, testserver } = require('../cfg.json')
const { emeraldminerId, diamondminerId, ironminerId, goldminerId, copperminerId, stoneminerId } = require("../configs/enroles.json")
const { ru_emeraldminerId, ru_diamondminerId, ru_ironminerId, ru_goldminerId, ru_copperminerId, ru_stoneminerId } = require("../configs/ruroles.json")

const Levels = require("discord-xp");
Levels.setURL(mongo_uri);

module.exports = (client) => {
    client.on('messageCreate', async (message, interaction) => {
        if (!message.guild) return;
        if (message.author.bot) return;
        const user = await Levels.fetch(message.author.id, message.guild.id);
        var userd = message.guild.members.cache.get(message.author.id);
      const ul = user.level

        //en roles
        var emeraldminer = message.guild.roles.cache.find(role => role.id === emeraldminerId);
        var diamondminer = message.guild.roles.cache.find(role => role.id === diamondminerId);
        var ironminer = message.guild.roles.cache.find(role => role.id === ironminerId);
        var goldminer = message.guild.roles.cache.find(role => role.id === goldminerId);
        var copperminer = message.guild.roles.cache.find(role => role.id === copperminerId);
        var stoneminer = message.guild.roles.cache.find(role => role.id === stoneminerId);

        //ru roles
        var ru_emeraldminer = message.guild.roles.cache.find(role => role.id === ru_emeraldminerId);
        var ru_diamondminer = message.guild.roles.cache.find(role => role.id === ru_diamondminerId);
        var ru_ironminer = message.guild.roles.cache.find(role => role.id === ru_ironminerId);
        var ru_goldminer = message.guild.roles.cache.find(role => role.id === ru_goldminerId);
        var ru_copperminer = message.guild.roles.cache.find(role => role.id === ru_copperminerId);
        var ru_stoneminer = message.guild.roles.cache.find(role => role.id === ru_stoneminerId);

        // 3 - 10 = stone miner
        // 10 - 25 = copper miner
        // 25 - 47 = iron miner
        // 47 - 60 = gold miner
        // 60 - 90 = diamond miner
        // 90+ = emerald miner

        //ru server
        if(message.guild.id == ruserver){
            //stone miner
            if (ul >= 3 && ul < 10){
                userd.roles.add(ru_stoneminer);
            };
            //copper miner
            if (ul >= 10 && ul < 25){
                userd.roles.remove(ru_stoneminer);
                userd.roles.add(ru_copperminer);
            };
            //iron miner
            if (ul >= 25 && ul < 47){
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(ru_copperminer);

                userd.roles.add(ru_ironminer);
            };
            //gold miner
            if (ul >= 47 && ul < 60){
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(ru_copperminer);
                userd.roles.remove(ru_ironminer);

                userd.roles.add(ru_goldminer);
            };
            //diamond miner
            if (ul >= 60 && ul < 90){
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(ru_copperminer);
                userd.roles.remove(ru_ironminer);
                userd.roles.remove(ru_goldminer);

                userd.roles.add(ru_diamondminer);
            };
            //emerald miner
            if (ul >= 90){
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(ru_copperminer);
                userd.roles.remove(ru_ironminer);
                userd.roles.remove(ru_goldminer);
                userd.roles.remove(ru_diamondminer);

                userd.roles.add(ru_emeraldminer);
            };
        };
        //en
        if(message.guild.id == enserver){
            //stone miner
            if (ul >= 3 && ul < 10){
                userd.roles.add(stoneminer);
            }
            //copper miner
            if (ul >= 10 && ul < 25){
                userd.roles.remove(stoneminer);
                userd.roles.add(copperminer);
            };
            //iron miner
            if (ul >= 25 && ul < 47){
                userd.roles.remove(stoneminer);
                userd.roles.remove(copperminer);

                userd.roles.add(ironminer);
            };
            //gold miner
            if (ul >= 47 && ul < 60){
                userd.roles.remove(stoneminer);
                userd.roles.remove(copperminer);
                userd.roles.remove(ironminer);

                userd.roles.add(goldminer);
            };
            //diamond miner
            if (ul >= 60 && ul < 90){
                userd.roles.remove(stoneminer);
                userd.roles.remove(copperminer);
                userd.roles.remove(ironminer);
                userd.roles.remove(goldminer);

                userd.roles.add(diamondminer);
            };
            //emerald miner
            if (ul >= 90){
                userd.roles.remove(stoneminer);
                userd.roles.remove(copperminer);
                userd.roles.remove(ironminer);
                userd.roles.remove(goldminer);
                userd.roles.remove(diamondminer);

                userd.roles.add(emeraldminer);
            };
        };
    })
}