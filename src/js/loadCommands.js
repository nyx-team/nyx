const fs = require('node:fs');

/**
 * Loads in the slash commands.
 */
function loadCommands(client) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);

        client.commands.set(command.name, command);
    }
}

module.exports = loadCommands;
