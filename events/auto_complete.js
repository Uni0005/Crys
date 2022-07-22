const db = require("../models/tags");

module.exports = {
	name: "interactionCreate", 
	once: false, 
	async execute (client, interaction) {
        if (!interaction.isAutocomplete()) return;
        const focusedValue = interaction.options.getFocused();

        if (interaction.commandName === 'tags'){
            const list = await db.find({guildId: interaction.guild.id});
            const invalid = ['not found']
            let tags = invalid.map((i) => ({name: `${i}, value: 'invalid`}))
            if(list?.length) tags = list.map((tag) => ({
                name: `${tag.name}`,
                value: `${tag.name.toLowerCase()}`
            }));
            
            await interaction.respond(tags)
        }
    }
}