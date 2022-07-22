const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/warningDB");
const settings = require("../models/settings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription("Warn user")
       .addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true))
       .addStringOption(option => option.setName('reason').setDescription('Reason').setRequired(true))
		 .addAttachmentOption((option) => option.setName('proof').setDescription('Proof for warn. Must be image or gif')),
	run: async ({client, interaction, args}) => {
      if(!interaction.member.permissions.has("MANAGE_MESSAGES", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
		const warndate = new Date(interaction.createdTimestamp)
        const target = interaction.options.getUser("user")
       	const user = await interaction.guild.members.cache.get(target.id);
       	const reason = interaction.options.getString('reason'); 
		const attachments = interaction.options.getAttachment('proof')
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
		let proof = "Absent"
		if(attachments) proof = attachments.url
		//not user
		if(!user) return interaction.reply({content: 'Invalid user', ephemeral: true})
    	//bot
 		if(target.bot) return interaction.reply({content: "Sorry, but you cant warn bot", ephemeral: true})
	    //yourself
		if(target.id == interaction.user.id) return interaction.reply({content: "Sorry, but you cant warn yourself", ephemeral: true})
        //Higher in position
		if(user.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: "Sorry, but you cant warn this user", ephemeral: true})

     	const usersCount = await db.countDocuments({guildId: interaction.guild.id});
       	
		let id = 3576; 
          
		if(usersCount && interaction.guild.id !== cfg.enserver){
			const usersLast = await db.find({guildId: interaction.guild.id}).sort({ _id: -1 }).limit(1);
		   id = usersLast[0].case + 1
	    } else id = dbGuild.case + 1;
        
		if(interaction.guild.id == cfg.enserver) await settings.updateOne({guildId: interaction.guild.id}, {$set: {case: id}});
		
      	new db({
			 guildId: interaction.guild.id,
            userId: target.id, 
            moderatorId: interaction.user.id, 
			 proofs: proof,
            reason: reason, 
            timestamp: warndate, 
            type: "warn", 
            case: id,
     	}).save();

       //Audit
      	const warn = new MessageEmbed()
       .setColor("RED")
       .setAuthor({ name: `Case: #${id} | warn | ${target.tag}`, iconURL: target.displayAvatarURL({ dynamic: true })})
       .addFields(
          	{name: "User:", value: `${target}`}, 
          	{name: "Moderator:", value: `${interaction.user}`},
          	{name: "Reason:", value: `${reason}`}
          )
          	.setFooter({text: `Id: ${target.id}`})
          	.setTimestamp()
           
		if(attachments) warn.setImage(proof);
       	const vc = await (client.channels.cache.get(dbGuild.verdictId)).send({ embeds: [warn] })
       	await db.updateOne({guildId: interaction.guild.id, case: id}, {$set: {vid: vc}})
          
       	//DM
      	const dm = new MessageEmbed() 
       .setDescription(`**Server:** ${interaction.guild.name}\n**Actioned by:** ${interaction.user}\n**Action:** Warn\n**Reason:** ${reason}`)
      	.setFooter({text: `Case #${id}`})
       	.setTimestamp()
          
		if(attachments) dm.setImage(proof);		
      	target.send({embeds: [dm]}).catch(() => null)
		const reply = new MessageEmbed ().setDescription(`${target} has been warned`).setFooter({text: `Case: ${id}`});
       	interaction.reply({embeds: [reply], ephemeral: true})
    }
}