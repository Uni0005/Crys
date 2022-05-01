const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { testId, testserver, token2 } = require('./cfg.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token2);
//all
rest.put(Routes.applicationGuildCommands(testId, testserver), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

	rest.put(Routes.applicationCommands(testId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);