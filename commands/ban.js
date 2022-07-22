const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/warningDB");
const settings = require("../models/settings"); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription("Ban user")
       	.addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true))
       	.addStringOption(option => option.setName('reason').setDescription('Reason').setRequired(true))
		.addAttachmentOption((option) => option.setName('proof').setDescription('Proof for ban. Must be image or gif')),
	run: async ({client, interaction, args}) => {
      	if(!interaction.member.permissions.has("BAN_MEMBERS", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
    	const target = interaction.options.getUser("user")
      	const user = interaction.guild.members.cache.get(target.id);
       	const reason = interaction.options.getString('reason'); 
       	const bandate = new Date(interaction.createdTimestamp);
		const ds = await client.users.fetch(target.id); 
		const attachments = interaction.options.getAttachment('proof')
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
		  
		let proof = "Absent"
		if(attachments){
			proof = attachments.url
		};

        //if moment
		 if(!ds) return interaction.reply({content: "invalid user", ephemeral: true})
		
        if(target.id == interaction.user.id) return interaction.reply({ content: "Sorry, but you cant ban yourself", ephemeral: true});
        if(target.bot) return interaction.reply({content: "sorry, but you cant ban bots", ephemeral: true});
  
        if(user && !user.bannable || user && user.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: "Sorry, but you cant ban this user", ephemeral: true})
        
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
            timestamp: bandate, 
            type: "ban", 
            case: id,
      	}).save();
          
       //Audit
       	const ban = new MessageEmbed()
      	.setColor("RED")
       	.setAuthor({ name: `Case: #${id} | ban | ${target.tag}`, iconURL: target.displayAvatarURL({ dynamic: true })})
       	.addFields(
       		{name: "User:", value: `${target}`}, 
          	{name: "Moderator:", value: `${interaction.user}`},
          	{name: "Reason:", value: `${reason}`}
      	)
      	.setFooter({text: `Id: ${target.id}`})
       	.setTimestamp()
          
		if(attachments) ban.setImage(proof);
			
       	const vc = await (client.channels.cache.get(dbGuild.verdictId)).send({ embeds: [ban] })
      	await db.updateOne({guildId: interaction.guild.id, case: id}, {$set: {vid: vc}})

		if(interaction.guild.id == cfg.enserver) await settings.updateOne({guildId: interaction.guild.id}, {$set: {case: id}});
		
       	const embed = new MessageEmbed ().setDescription(`${target} has been banned`).setFooter({text: `Case: ${id}`});
			
      	interaction.reply({embeds: [embed], ephemeral: true})
		
		interaction.guild.bans.create(target.id, {days: 0, reason: `Case: #${id} - ${interaction.user.tag}. ${reason}`}) 

		//user.ban({days: 0, reason: `Case: #${id} - ${interaction.user.tag}. ${reason}`}) 
       	
		//DM
		
		if(!user) return;
		
       	const dm = new MessageEmbed() 
       	.setDescription(`**Server:** ${interaction.guild.name}\n**Actioned by:** ${interaction.user}\n**Action:** Ban\n**Reason:** ${reason}`)
       	.setFooter({text: `Case #${id}`})
       	.setTimestamp()
          
		if(attachments) dm.setImage(proof);

       	user.send({embeds: [dm]}).catch(() => null)
    }
}