const cfg = require ("../cfg.json"); 
const settings = require("../models/settings");
const Levels = require("discord-xp");
Levels.setURL(cfg.mongo_uri);

module.exports = {
	name: "messageCreate", 
	once: false, 
	async execute (client, message) {
		if (!message.guild) return; 
		if(message.author.bot) return;
		if (message.channel.id == "963710917961457675" || message.channel.id == "835802833878122577") return;
		
		const randomAmountOfXp = Math.floor(Math.random() * 15) + 1; 
       	const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
       	const user = await Levels.fetch(message.author.id, message.guild.id);
       	const dbGuild = await settings.findOne({ guildId: message.guild.id }); 
		
		if (hasLeveledUp){
			//ru server 
			if (message.guild.id == cfg.ruserver){
				if(!dbGuild.rankId) return message.channel.send(`${message.author} только что получил ${user.level} уровень! :tada:`);
				
				return (client.channels.cache.get(dbGuild.rankId)).send(`${message.author} только что получил ${user.level} уровень! :tada:`);
			}
			
			if(!dbGuild.rankId) return message.channel.send(`${message.author} has reached level ${user.level}! :tada:`);
			
			(client.channels.cache.get(dbGuild.rankId)).send(`${message.author} has reached level ${user.level}! :tada:`);
		}
		
	}
	
}