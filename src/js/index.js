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

// Temporarily Here
// TODO: Make an Event Handler
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        await interaction.reply({
            content: 'An error occured while trying to execute the command.',
            ephemeral: true,
        });
        console.error(err);
    }
});

// On Ready
client.on('ready', async () => {
    loadCommands(client);
    console.log('Bot is Ready!');
});

client.login(config.token);
