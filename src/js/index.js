const {
    Client,
    Collection,
    Intents,
} = require('discord.js');

const fs = require('node:fs');

const Util = require('./Util');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

// #region Load Config
const configJSON = fs.readFileSync('../config.json', {
    encoding: 'utf8',
});
const config = JSON.parse(configJSON);
// #endregion

// Collection(s)
client.commands = new Collection();
client.legacyCommands = new Collection();

Util.loadEvents(client);
client.on('nyxDebug', (message) => console.log(message));

client.login(config.token);
