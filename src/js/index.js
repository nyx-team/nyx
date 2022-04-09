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

// Event(s) Handler
const eventFiles = fs.readdirSync('./events', {
    encoding: 'utf8',
}).filter((file) => file.endsWith('.js'));

eventFiles.forEach((file) => {
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    const events = require(`./events/${file}`);

    if (events.once && events.once === true) {
        client.once(events.name, async (...args) => events.execute(client, ...args));
    } else {
        client.on(events.name, async (...args) => events.execute(client, ...args));
    }
});

client.on('nyxDebug', (message) => console.log(message));

client.login(config.token);
