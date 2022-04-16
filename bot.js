const { token, mongo_uri } = require('./cfg.json');
const { Client, Intents, MessageEmbed, MessageAttachment, Collection} = require('discord.js');
const client = new Client({ intents: [581] });
const fs = require('node:fs');
const mongoose = require('mongoose')

require('./events/messageCreate')(client);
require('./events/ready')(client);
require('./events/lvl-system')(client);

client.login(token);