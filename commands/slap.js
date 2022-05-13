const pictures = require('../configs/pictures.json')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { enserver, ruserver } = require('../cfg.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slap')
		.setDescription("Slap member")
        .addUserOption(option => option.setName('user').setDescription('Choose user').setRequired(true)),
	run: async ({client, interaction, args}) => {
      //function
      function getRandomInt(max) { 
        return Math.floor(Math.random() * max);
      };
      const picnum = getRandomInt(11) 
      const target = interaction.options.getUser('user')
      console.log(picnum)
      //if moment lmao
      
      //yourself
      if(target.id == interaction.user.id){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slapyourself) 
           .setDescription(`slaps ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      };
      
      if(picnum == 1 || picnum == 0){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap1) 
           .setDescription(`slaps ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }
      
      if(picnum == 2){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap2) 
           .setDescription(`slaps ${target}`)
        interaction.reply({ embeds: [hug] });
        return;
      };
      
      if(picnum == 3){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap3) 
           .setDescription(`slaps ${target}`)
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 4){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap4) 
           .setDescription(`slaps ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 5){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap5) 
           .setDescription(`slaps ${target}`)
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 6){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap6) 
           .setDescription(`slaps ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 7){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap7) 
           .setDescription(`slaps ${target}`)
        interaction.reply({ embeds: [hug] });
        return;
      };
      
      if(picnum == 8){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap8) 
           .setDescription(`slaps ${target}`)
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 9){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap9) 
           .setDescription(`slaps ${target}`)
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 10){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap10) 
           .setDescription(`slaps ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 11){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.slap11) 
           .setDescription(`slaps ${target}`)
        interaction.reply({ embeds: [hug] });
        return;
      }; 
    }
}