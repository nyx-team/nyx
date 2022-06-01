const {
    Client,
    Collection,
    Intents,
} = require('discord.js');
const { readFileSync } = require('fs');
const { join } = require('path');

const { loadEvents } = require('./Util');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
    partials: ['CHANNEL'],
    allowedMentions: {
        parse: ['users'],
        repliedUser: false,
    },
    presence: {
        activities: [
            {
                name: 'dark theme moment',
                type: 'PLAYING',
            },
        ],
    },
});

try {
    require('dotenv').config();
    /* eslint-disable no-empty */
} catch {}

// #region Load Config
let configJSON;

try {
    configJSON = readFileSync(join(__dirname, '.', 'config.json'), {
        encoding: 'utf8',
    });
} catch {
    configJSON = null;
}

const config = configJSON != null 
    ? JSON.parse(configJSON)
    : process.env.token;
// #endregion

const token = config?.token ?? process.env.token;

// Collection(s)
client.commands = new Collection();
client.legacyCommands = new Collection();
client.snipedMessages = new Collection();

loadEvents(client);
client.on('nyxDebug', (message) => console.log(message));

client.login(token);
