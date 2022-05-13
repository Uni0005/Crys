const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { daddy } = require("../cfg.json")

module.exports = (client) => {
    client.on('messageCreate', async (message, interaction) => {
	if (message.content == "*star") {
	    if(message.author.id !== daddy) return
            const id = message.reference.messageId
            const ms = await message.fetchReference();
            ms.react("⭐")
            };
	   })
    }