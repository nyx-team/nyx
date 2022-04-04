const { Client, Intents } = require('discord.js');

const path = require('path');
const fs = require('node:fs');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

const configJSON = fs.readFileSync('../config.json', { encoding: 'utf8' });

const config = JSON.parse(configJSON);

client.on('ready', async () => {
    console.log('Bot is Ready!');
});

client.login(config.token);
