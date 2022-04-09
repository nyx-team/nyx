const {
    Client,
    Collection,
    Intents,
} = require('discord.js');

const fs = require('node:fs');

const loadCommands = require('./loadCommands');

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

// On Ready
client.once('ready', async () => {
    loadCommands(client);
    console.log('Bot is Ready!');
});

client.login(config.token);
