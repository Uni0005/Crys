const pictures = require('../configs/pictures.json')
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { enserver, ruserver, testserver } = require('../cfg.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kiss')
		.setDescription("Kiss member")
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
      
      //yourself - en
      if(target.id == interaction.user.id && interaction.guild.id == enserver){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setDescription(`And how do you imagine it?`)
        interaction.reply({ embeds: [hug], ephemeral: true });
        return;
      }; 
      
      //yourself - ru
      if(target.id == interaction.user.id && interaction.guild.id == testserver){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setDescription(`И как ты себе это представляешь?`)
        interaction.reply({ embeds: [hug], ephemeral: true });
        return;
      }; 
      
      if(picnum == 1 || picnum == 0){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss1) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }
      
      if(picnum == 2){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss2) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      };
      
      if(picnum == 3){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss3) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 4){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss4) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 5){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss5) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 6){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss6) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 7){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss7) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      };
      
      if(picnum == 8){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss8) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 9){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss9) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 10){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss10) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
      
      if(picnum == 11){
        const hug = new MessageEmbed()
           .setColor("#004bff")
           .setImage(pictures.kiss11) 
           .setDescription(`Kisses ${target}`) 
        interaction.reply({ embeds: [hug] });
        return;
      }; 
    }
}