const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, ruserver, enserver, token } = require('./cfg.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);
//all
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

//ru
rest.put(Routes.applicationGuildCommands(clientId, ruserver), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
//en
rest.put(Routes.applicationGuildCommands(clientId, enserver), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
	