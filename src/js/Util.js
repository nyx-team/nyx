const fs = require('node:fs');

/**
 * Utilities specifically for Nyx
 */
class Util {
    /**
     * Loads in the slash commands.
     */
    static loadCommands(client) {
        const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

        commandFiles.forEach((file) => {
            /* eslint-disable global-require */
            /* eslint-disable import/no-dynamic-require */
            const command = require(`./commands/${file}`);

            client.commands.set(command.name, command);
        });
    }
}

module.exports = Util;
