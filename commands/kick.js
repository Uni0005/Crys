const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/warningDB");
const settings = require("../models/settings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription("Kick user")
        .addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason'). setRequired(true))
		.addAttachmentOption((option) => option.setName('proof').setDescription('Proof for kick. Must be image or gif')), 

	run: async ({client, interaction, args}) => {
		if(!interaction.member.permissions.has("KICK_MEMBERS", true)) return interaction.reply("Not enough permissions to use this command");
		
		const target = interaction.options.getUser("user")
       const user = interaction.guild.members.cache.get(target.id);
       const reason = interaction.options.getString('reason'); 
       const kickdate = new Date(interaction.createdTimestamp)
		const attachments = interaction.options.getAttachment('proof')
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
		
		let proof = "Absent"
		if(attachments){
			proof = attachments.url
		};

        //if moment
		 if(!user) return interaction.reply({content: "invalid user", ephemeral: true})
		
        if(target.id == interaction.user.id) return interaction.reply({ content: "Sorry, but you cant kick yourself", ephemeral: true});
        if(target.bot) return interaction.reply({content: "sorry, but you cant kick bots", ephemeral: true});
  
        if(!user.kickable || user.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: "Sorry, but you cant kick this user", ephemeral: true})

        const usersCount = await db.countDocuments({guildId: interaction.guild.id});
          let id = 1; 
          
		  if(usersCount && interaction.guild.id !== cfg.enserver){
			const usersLast = await db.find({guildId: interaction.guild.id}).sort({ _id: -1 }).limit(1);
		   id = usersLast[0].case + 1
	    } else id = dbGuild.case + 1;
          
		new db({
			 guildId: interaction.guild.id,
            userId: target.id, 
            moderatorId: interaction.user.id, 
			 proofs: proof,
            reason: reason, 
            timestamp: kickdate, 
            type: "kick", 
            case: id,
     	}).save();

          //Audit
      	const kick = new MessageEmbed()
       	.setColor("RED")
       	.setAuthor({ name: `Case: #${id} | kick | ${target.tag}`, iconURL: target.displayAvatarURL({ dynamic: true })})
       	.addFields(
       	{name: "User:", value: `${target}`}, 
       	{name: "Moderator:", value: `${interaction.user}`},
       	{name: "Reason:", value: `${reason}`}
       	)
       	.setFooter({text: `Id: ${target.id}`})
       	.setTimestamp();
          
		if(attachments) kick.setImage(proof);
			
       	const vc = await (client.channels.cache.get(dbGuild.verdictId)).send({ embeds: [kick] })
       	await db.updateOne({guildId: interaction.guild.id, case: id}, {$set: {vid: vc}})

		if(interaction.guild.id == cfg.enserver) await settings.updateOne({guildId: interaction.guild.id}, {$set: {case: id}});
          
    	//DM
       	const dm = new MessageEmbed() 
       	.setDescription(`**Server:** ${interaction.guild.name}\n**Actioned by:** ${interaction.user}\n**Action:** Kick\n**Reason:** ${reason}`)
      	.setFooter({text: `Case #${id}`})
       	.setTimestamp()
  
		if(attachments) dm.setImage(proof);
			      
       	user.send({embeds: [dm]}).catch(() => null)

		user.kick(`Case: #${id} - ${interaction.user.tag}. ${reason}`) 
			
		const embed = new MessageEmbed () 
		.setDescription(`${target} has been kicked`)
		.setFooter({text: `Case: ${id}`}); 

       	interaction.reply({embeds: [embed], ephemeral: true})
    }
}