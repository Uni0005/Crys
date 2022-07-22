const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const cfg = require("../cfg.json"); 
const ms = require("ms"); 
const db = require("../models/warningDB");
const settings = require("../models/settings");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription("Mute user")
       	.addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true))
       	.addStringOption(option => option.setName('time').setDescription('Choose time').setRequired(true))
       	.addStringOption(option => option.setName('reason').setDescription('Reason'). setRequired(true))
		.addAttachmentOption((option) => option.setName('proof').setDescription('Proof for mute. Must be image or gif')),

	run: async ({client, interaction, args}) => {
      if(!interaction.member.permissions.has("MANAGE_MESSAGES", true)) return interaction.reply({content: 'Not enough permissions to use this command', ephemeral: true});
    	const target = interaction.options.getUser("user")
       	const user = await interaction.guild.members.fetch(target.id);
       	const time = interaction.options.getString('time'); 
       	const reason = interaction.options.getString('reason'); 
       	const timeout = ms(time);
       	const mutedate = new Date(interaction.createdTimestamp); 
		const attachments = interaction.options.getAttachment('proof')
		const dbGuild = await settings.findOne({ guildId: interaction.guild.id });
		
		let proof = "Absent"
		if(attachments){
			proof = attachments.url
		}
        
        //if moment
		if(!user) return interaction.reply({content: 'Invalid user', ephemeral: true})
		
        if(!timeout || timeout < 1) return interaction.reply({content: "Invalid time", ephemeral: true}); 

        if(timeout >= ms("29d")) return interaction.reply({content: `Sorry, but i cant mute ${user} for ${time}. Try again by entering a time less than 29 days.`, ephemeral: true});

        if(target.id == interaction.user.id) return interaction.reply({ content: "Sorry, but you cant mute yourself", ephemeral: true})

        if(target.bot) return interaction.reply({content: "sorry, but you cant mute bots", ephemeral: true})
      
        if(!user.moderatable || user.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content: "Sorry, but you cant mute this user", ephemeral: true})
		
		
		//console.log(user.communicationDisabledUntil)
		//if(user.communicationDisabledUntil !== null) return interaction.reply({content: 'Already muted user', ephemeral: true})

      	const usersCount = await db.countDocuments({});
      	let id = 1; 
          
		if(usersCount && interaction.guild.id !== cfg.enserver){
			const usersLast = await db.find({guildId: interaction.guild.id}).sort({ _id: -1 }).limit(1);
		    id = usersLast[0].case + 1
	    } else id = dbGuild.case + 1;
          
		user.timeout(timeout, `Case: #${id} - ${interaction.user.tag}. ${reason}`) 
		new db({
			 guildId: interaction.guild.id,
            userId: target.id, 
            moderatorId: interaction.user.id, 
			 proofs: proof,
			 length: time,
            reason: reason, 
            timestamp: mutedate, 
            type: "mute", 
            case: id,
     	}).save(); 

       	//Audit
       	const mute = new MessageEmbed()
       .setColor("RED")
       .setAuthor({ name: `Case: #${id} | mute | ${target.tag}`, iconURL: target.displayAvatarURL({ dynamic: true })})
       	.addFields(
       		{name: "User:", value: `${target}`}, 
          	{name: "Moderator:", value: `${interaction.user}`},
          	{name: "Reason:", value: `${reason}`}, 
			{name: "Length:", value: `${time}`},
      	)
       	.setFooter({text: `Id: ${target.id}`})
       	.setTimestamp();
          
		if(attachments) mute.setImage(proof);

       	const vc = await (client.channels.cache.get(dbGuild.verdictId)).send({ embeds: [mute] })
       	await db.updateOne({guildId: interaction.guild.id, case: id}, {$set: {vid: vc}})

		if(interaction.guild.id == cfg.enserver) await settings.updateOne({guildId: interaction.guild.id}, {$set: {case: id}});

          
      	//DM
       	const dm = new MessageEmbed() 
       	.setDescription(`**Server:** ${interaction.guild.name}\n**Actioned by:** ${interaction.user}\n**Action:** Mute\n**Length:** ${time}\n**Reason:** ${reason}`)
      	.setFooter({text: `Case #${id}`})
       	.setTimestamp();
          
		if(attachments) dm.setImage(proof);

       user.send({embeds: [dm]}).catch(() => null)
		
      	const embed = new MessageEmbed () 
		.setDescription(`${target} has been muted`)
		.setFooter({text: `Case: ${id}`});
			
        interaction.reply({embeds: [embed], ephemeral: true})
    }
}