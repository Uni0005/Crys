const db = require("../models/tags");
const cfg = require("../cfg.json");
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "messageCreate", 
	once: false, 
	async execute (client, message) {
        //if(message.author.id !== cfg.daddy) return;
        if(!message.content.startsWith("+")) return;

        const args = message.content.slice(1).trim().split(/ +/g);
        //console.log(args[0])
        const tag = await db.findOne({guildId: message.guild.id, name: args[0].toLowerCase()});

        if(!tag) return;

        if(tag.type == 'string') return message.channel.send(tag.content); 
		console.log(tag.description);
		//embed tag
		const embed = new MessageEmbed()
		.setTitle(`${tag?.title}`)
		.setDescription(tag.content)
		.setColor(`${tag.color}` || 'BLACK');
		
		console.log(tag.color)
		message.reply({embeds: [embed]})
    }
} 