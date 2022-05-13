const { token, mongo_uri, token2} = require('./cfg.json');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [581] });
const fs = require('node:fs');
const mongoose = require('mongoose');

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

require('./events/ready')(client);
require('./events/lvl-system')(client);
require('./events/lvl-roles')(client);
require('./events/star')(client);
require('./events/ycc')(client);

client.login(token);
