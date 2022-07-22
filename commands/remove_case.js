const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/warningDB");
const settings = require("../models/settings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove-case')
		.setDescription("Remove punishment")
        .addStringOption(option => option.setName('id').setDescription('Case Number').setRequired(true)),
	run: async ({client, interaction, args}) => {
      if(!interaction.member.permissions.has("MANAGE_MESSAGES", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
    	const caseid = interaction.options.getString('id');
       let c = await db.findOne({guildId: interaction.guild.id, case: caseid})
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
          
       if(!c) return interaction.reply({content: "Invalid case id", ephemeral: true}); 

		//const mod = await client.users.fetch(c.moderatorId)
		const user = await client.users.fetch(c.userId).catch(() => null)
		
       	const embed = new MessageEmbed()
       .setColor("RED")
       //.setAuthor({ name: mod.tag, iconURL: mod.displayAvatarURL({ dynamic: true })})
       .setDescription(`**Member:** ${user} (${c.userId})\n**Action:** Punishment removed\n**Removed by:** ${interaction.user}`)
       .setFooter({text: `Case: #${c.case}`})
       .setTimestamp(c.timestamp);

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('yes')
					.setLabel('Yes')
					.setStyle('SUCCESS'),
				new MessageButton()
					.setCustomId('no')
					.setLabel('No')
					.setStyle('DANGER'),
			);
		//find case
		
		let description = `**Member:** ${user} (${c.userId})\n**Action:** ${c.type}\n**Reason:** ${c.reason}`; 
		
		if(c.type == "mute"){
			description = `**Member:** ${user} (${c.userId})\n**Action:** ${c.type}\n**Reason:** ${c.reason}\n**Length:** ${c.length}`
		};
		 
      	const caseEmbed = new MessageEmbed()
		.setColor("YELLOW")
		//.setAuthor({ name: mod.tag, iconURL: mod.displayAvatarURL({ dynamic: true })})
		.setDescription(`${description}`)
		.setFooter({text: `Case: #${c.case}`})
		.setTimestamp(c.timestamp)
		
		if(c.proofs !== "Absent") embed.setImage(c.proofs)
       	
		const reply = await interaction.reply({content: 'Are you sure you want to remove this punishment?', components: [row], embeds: [caseEmbed], ephemeral: true, fetchReply: true})
		
		//collector and executing 
		
		
		const collector = reply.createMessageComponentCollector({ time: 60000, max: 1});
		
		collector.on('collect', async i => {
			if (i.customId === 'yes') {
				const member = await interaction.guild.members.fetch(c.userId).catch(() => null)

				//main Part
				const em = new MessageEmbed ().setDescription(`Case: #${c.case} for ${user.tag} has been removed`);
			
        		(client.channels.cache.get(dbGuild.logId)).send({embeds: [embed, caseEmbed]})

       			c.delete()
			
				await i.update({ embeds: [em], components: [], content: ' '});

				if(!user) return;
				if(!member) return;

				if(c.type == 'mute'){
					await member.timeout(null, `Case was removed by: ${interaction.user.tag}`).catch(() => null)
				 } else if(c.type == 'ban'){
					 await interaction.guild.members.unban(c.userId, `${interaction.user.tag} – removed case`).catch(() => null) 
				 };
			}
			
			if(i.customId === "no"){
				await i.update({content: 'Cancelled command.', embeds: [], components: []})
			}
		});

		collector.on('end', async (collected) => {
			if (collected.size < 1)
        		await interaction.editReply({ content: 'The waiting time has expired', embeds: [], components: [] });
    	
		})
    }
}