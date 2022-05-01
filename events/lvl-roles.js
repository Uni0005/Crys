const { mongo_uri, enserver, ruserver, testserver } = require('../cfg.json')
const { emeraldminerId, diamondminerId, ironminerId, goldminerId, copperminerId, stoneminerId } = require("../configs/en-roles.json")
const { ru_emeraldminerId, ru_diamondminerId, ru_ironminerId, ru_goldminerId, ru_copperminerId, ru_stoneminerId } = require("../configs/ruroles.json")

const Levels = require("discord-xp");
Levels.setURL(mongo_uri);

module.exports = (client) => {
    client.on('messageCreate', async (message, interaction) => {
        if (!message.guild) return;
        if (message.author.bot) return;
        const user = await Levels.fetch(message.author.id, message.guild.id);
        var userd = message.guild.members.cache.get(message.author.id);

        //en roles
        var emeraldminer = message.guild.roles.cache.find(role => role.id === emeraldminerId);
        var diamondminer = message.guild.roles.cache.find(role => role.id === diamondminerId);
        var ironminerId = message.guild.roles.cache.find(role => role.id === ironminer);
        var goldminer = message.guild.roles.cache.find(role => role.id === goldminerId);
        var copperminer = message.guild.roles.cache.find(role => role.id === copperminerId);
        var stoneminer = message.guild.roles.cache.find(role => role.id === stoneminerId);

        //ru roles
        var ru_emeraldminer = message.guild.roles.cache.find(role => role.id === ru_emeraldminerId);
        var ru_diamondminer = message.guild.roles.cache.find(role => role.id === ru_diamondminerId);
        var ru_ironminerId = message.guild.roles.cache.find(role => role.id === ru_ironminer);
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
        if(message.guild.id == ruserver ){
            //stone miner
            if (user.level >= 3){
                if (user.level >= 10) return;
                userd.roles.add(ru_stoneminer);
            };
            //copper miner
            if (user.level >= 10){
                if (user.level >= 25) return;
                userd.roles.remove(ru_stoneminer);
                userd.roles.add(ru_copperminer);
            };
            //iron miner
            if (user.level >= 25){
                if (user.level >= 47) return;
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(ru_copperminer);

                userd.roles.add(ru_ironminer);
            };
            //gold miner
            if (user.level >= 47){
                if (user.level >= 60) return;
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(ru_copperminer);
                userd.roles.remove(ru_ironminer);

                userd.roles.add(ru_goldminer);
            };
            //diamond miner
            if (user.level >= 60){
                if (user.level >= 90) return;
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(ru_copperminer);
                userd.roles.remove(ru_ironminer);
                userd.roles.remove(ru_goldminer);

                userd.roles.add(ru_diamondminer);
            };
            //emerald miner
            if (user.level >= 90){
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(ru_copperminer);
                userd.roles.remove(ru_ironminer);
                userd.roles.remove(ru_goldminer);
                userd.roles.remove(ru_diamondminer);

                userd.roles.add(ru_emeraldminer);
            };
        };
        //en
        if(message.guild.id == enserver ){
            //stone miner
            if (user.level >= 3){
                if (user.level >= 10) return;
                userd.roles.add(stoneminer);
            };
            //copper miner
            if (user.level >= 10){
                if (user.level >= 25) return;
                userd.roles.remove(stoneminer);
                userd.roles.add(copperminer);
            };
            //iron miner
            if (user.level >= 25){
                if (user.level >= 47) return;
                userd.roles.remove(stoneminer);
                userd.roles.remove(copperminer);

                userd.roles.add(ironminer);
            };
            //gold miner
            if (user.level >= 47){
                if (user.level >= 60) return;
                userd.roles.remove(ru_stoneminer);
                userd.roles.remove(copperminer);
                userd.roles.remove(ironminer);

                userd.roles.add(goldminer);
            };
            //diamond miner
            if (user.level >= 60){
                if (user.level >= 90) return;
                userd.roles.remove(stoneminer);
                userd.roles.remove(copperminer);
                userd.roles.remove(ironminer);
                userd.roles.remove(goldminer);

                userd.roles.add(diamondminer);
            };
            //emerald miner
            if (user.level >= 90){
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