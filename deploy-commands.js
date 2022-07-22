const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const cfg = require('./cfg.json'); 
const { MessageEmbed } = require('discord.js');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(cfg.token);
//all
rest.put(Routes.applicationCommands(cfg.clientId), { body: commands })
	.then(() => console.log('Successful deploying of global commands'))
	.catch(console.error);

//ru
//rest.put(Routes.applicationGuildCommands(clientId, ruserver), { body: commands })
	//.then(() => console.log('Successfully registered application commands.'))
	//.catch(console.error);
	
//en
//rest.put(Routes.applicationGuildCommands(clientId, enserver), { body: commands })
	//.then(() => console.log('Successfully registered application commands.'))
	//.catch(console.error);