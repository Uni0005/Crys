const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/warningDB");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('case')
		.setDescription("Punishments case")
        .addStringOption(option => option.setName('number').setDescription('Case Number').setRequired(true)),
	run: async ({client, interaction, args}) => {
    	const caseid = interaction.options.getString('number');
		if(caseid < 3571 && interaction.user.id !== cfg.daddy) return interaction.reply({content: "Waiting for the final database migration", ephemeral: true})
		
        let c = await db.findOne({guildId: interaction.guild.id, case: caseid})
		if(!c) return interaction.reply({content: "not found", ephemeral: true})
		
		const mod = await client.users.fetch(c.moderatorId).catch(() => null);
		let user = await client.users.fetch(c.userId).catch(() => null);

		const tag = user.tag
		if(!tag) tag = `Deleted User`
		
		let description = `**Member:** ${tag} (${c.userId})\n**Action:** ${c.type}\n**Reason:** ${c.reason}`; 
		
		if(c.type == "mute" || c.type == "temp-ban"){
			description = `**Member:** ${tag} (${c.userId})\n**Action:** ${c.type}\n**Reason:** ${c.reason}\n**Length:** ${c.length}`;
		};
		
      	const embed = new MessageEmbed()
		.setColor("YELLOW")
		.setDescription(`${description}`)
		.setFooter({text: `Case: #${c.case}`})
		.setTimestamp(c.timestamp);

		//if mod account not found/deleted
		if(!mod) embed.setAuthor({ name: "Deleted User", iconURL: "https://images.app.goo.gl/e5AEDW5v4L4t2gSp6"})
		else embed.setAuthor({ name: mod.tag, iconURL: mod.displayAvatarURL({ dynamic: true })})
		//
		
		if(c.proofs !== "Absent") embed.setImage(c.proofs)
       	interaction.reply({embeds: [embed]})
    }
}