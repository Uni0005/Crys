const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = (client) => {
    client.on('messageCreate', async (message, interaction) => {
	if (message.channel.id == "962005770227028018" && !message.member.permissions.has("MANAGE_MESSAGES", true)) {
        if(!message.attachments.size){
            var userd = message.guild.members.cache.get(message.author.id);
            const channel = client.channels.cache.get("962005770227028018")
            userd.send("Sorry, but <#962005770227028018> isn't for offtop. If you want to comment on someone's control, create a thread and do it there. In case of an error, please contact <@920325546200694905>").catch(async err => {
              const e = await channel.send(`${message.author} sorry, but <#962005770227028018> isn't for offtop. If you want to comment on someone's control, create a thread and do it there. In case of an error, please contact <@920325546200694905>`);
            })
            message.delete(); 
            return;
         }
       };
   })
}