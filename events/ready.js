const { MessageEmbed } = require('discord.js');
const cfg = require('../cfg.json'); 
const mongoose = require("mongoose");

module.exports = {
	name: "ready", 
	once: false, 
	async execute (client) {
		console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity('Sky with artDev', { type: 'PLAYING' });
		client.user.setPresence({status: "idle"})
        const BotReady = new MessageEmbed().setTitle("I'm online again!").setColor('#32CD32')
		
		if(!cfg.mongo_uri) return;
		
       mongoose.connect(cfg.mongo_uri, {
          	useNewUrlParser: true, 
          	useUnifiedTopology: true
       }).then(() => {
          console.log("Bot connected to database")
        })
		
		client.on('interactionCreate', async interaction => {
            if (!interaction.isCommand()) return;
        
            const command = client.commands.get(interaction.commandName);
            const applicationCommand = await client.guilds.cache.get('962622208138682398')?.commands.fetch('962263126647144449');
        
            if (!command) return;

            try {
                await command.run({ client, interaction });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was a problem when executing this command. Contact <@920325546200694905>', ephemeral: true, allowedMentions: {parse: []} });
            }
        })
	}
}