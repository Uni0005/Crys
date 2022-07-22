const db = require("../models/tags");
const cfg = require("../cfg.json");

module.exports = {
	name: "interactionCreate", 
	once: false, 
	async execute (client, interaction) {
        if (!interaction.isModalSubmit()) return;
		 //console.log(interaction.customId)
        if(interaction.customId == "string-create"){
            const name = interaction.fields.getTextInputValue('name');
	        const text = interaction.fields.getTextInputValue('content');
 
            const tag_name = name.slice().trim().split(/ +/g);
            if(tag_name.length > 1) return interaction.reply({content: `Invalid tag name.`})
            const tag = await db.findOne({guildId: interaction.guild.id, name: name});
            if(tag) return interaction.reply({content: "Invalid name."});

            new db({
                guildId: interaction.guild.id,
                name: name.toLowerCase(),
                type: 'string',
                content: text
            }).save();
            
            await interaction.reply({ content: 'Your submission was recieved successfully!'});
        }
		 //create embed tag
		 if(interaction.customId == "embed-create"){
			const name = interaction.fields.getTextInputValue('name'); 
			const description = interaction.fields.getTextInputValue('content'); 
			const title = interaction.fields.getTextInputValue('title');
			const color = interaction.fields.getTextInputValue('color').toUpperCase(); 
			const tag_name = name.slice().trim().split(/ +/g);
           if(tag_name.length > 1) return interaction.reply({content: `Invalid tag name.`})
           const tag = await db.findOne({guildId: interaction.guild.id, name: name});
           if(tag) return interaction.reply({content: "Invalid name."});

			new db({
				guildId: interaction.guild.id, 
				name: name.toLowerCase(), 
				type: 'embed', 
				content: description, 
				title: title, 
				color: color
			}).save();

			interaction.reply({content: `changes was saved (maybe)`})
		}
		 //edit String
		if(interaction.customId.startsWith('edit_s')){
			const name = interaction.customId.slice(7);
			const new_name = interaction.fields.getTextInputValue('name');
			const new_content = interaction.fields.getTextInputValue('content');
		    await db.updateOne({guildId: interaction.guild.id, name: name}, {$set: { name: new_name.toLowerCase(), content: new_content }})
		
			interaction.reply({content: `updated`})
		}
    }
}