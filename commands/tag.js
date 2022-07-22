const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent, MessageSelectMenu} = require('discord.js');
const cfg = require("../cfg.json"); 
const db = require("../models/tags");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tags')
		.setDescription("just test command")
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Create tag')
                .addStringOption(option =>
                    option.setName('type')
                        .setRequired(true)
                        .setDescription("Tag type")
                        .addChoices(
                            { name: 'Embed tag', value: 'embed' },
                            { name: 'String', value: 'string' },
                        ))
                .addBooleanOption(option => option.setName("lang_tag").setDescription("gg")))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List of tags'))
        .addSubcommand(subcommand =>
            subcommand
                .setName("edit")
                .setDescription("Edit tag")
                .addStringOption(option => option.setName("name").setDescription("Tag name").setRequired(true).setAutocomplete(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("delete")
                .setDescription("Delete tag")
                .addStringOption(option => option.setName("name").setDescription("Tag name").setRequired(true).setAutocomplete(true))),
	run: async ({client, interaction}) => {
        if(interaction.user.id !== cfg.daddy) return interaction.reply({content: `You cant use it`, ephemeral: true});
        const list = await db.find({guildId: interaction.guild.id});

        //add
        if (interaction.options.getSubcommand() === 'create'){
            const type = interaction.options.getString('type');
            const string = new Modal()
            .setCustomId("string-create")
            .setTitle("Create String Tag");
			 const embed = new Modal()
			 .setCustomId('embed-create')
			 .setTitle('Create Embed Tag')
            const name = new MessageActionRow().addComponents(new TextInputComponent()
			.setCustomId('name')
			.setLabel("Tag name")
			.setStyle('SHORT')
           .setRequired(true)
			.setMaxLength(10)
           );
            const description = new MessageActionRow().addComponents(new TextInputComponent()
			.setCustomId('content')
			.setLabel("Tag content")
			.setStyle('PARAGRAPH')
           .setRequired(true)
           );

           const title = new MessageActionRow().addComponents(new TextInputComponent()
			.setCustomId('title')
			.setLabel("Embed Title")
			.setStyle('SHORT')
           );
			
			const color = new MessageActionRow().addComponents(new TextInputComponent()
			.setCustomId('color')
			.setLabel("Embed Color")
			.setStyle('SHORT')
           );

			if(type == "string"){
                string.addComponents(name, description)
                await interaction.showModal(string);
            } else if(type == "embed"){
				 embed.addComponents (name, title, color, description); 
				 await interaction.showModal(embed)
			 }
        };
        //list
        if (interaction.options.getSubcommand() === 'list'){
            if(!list?.length) return interaction.reply({content: 'not found', ephemeral: true});
            const tags = list.map((tag) => `${tag.name}`);
            interaction.reply({content: `${tags.join(', ')}`});
        };
        //edit
        if (interaction.options.getSubcommand() === 'edit'){
            const name = interaction.options.getString('name');
            const tag = await db.findOne({guildId: interaction.guild.id, name: name});

            if(!tag) return interaction.reply({content: `Sorry, but tag was not found`, ephemeral: true});

            const string = new Modal()
            .setCustomId(`edit_s_${name}`)
            .setTitle("Edit String Tag");

            const description = new MessageActionRow().addComponents(new TextInputComponent()
			.setCustomId('content')
			.setLabel("Tag content")
			.setStyle('PARAGRAPH')
           .setRequired(true)
			.setValue(`${tag.content}`)
           ); 

			const tag_name = new MessageActionRow().addComponents(new TextInputComponent()
			.setCustomId('name')
			.setLabel("Tag name")
			.setStyle('SHORT')
           .setRequired(true)
			.setValue(`${name}`)
			.setMaxLength(10)
			); 

			string.addComponents(tag_name, description)
			await interaction.showModal(string)
        };
        //delete
        if (interaction.options.getSubcommand() === 'delete'){
            const name = interaction.options.getString('name');
            const tag = await db.findOne({ guildId: interaction.guild.id, name: name})
            if(!tag) return interaction.reply({content: `Sorry, but __${name}__ was not found`, ephemeral: true});

            tag.delete();
            interaction.reply({content: `Tag __${name}__ was deleted.`})
        }
    }
}