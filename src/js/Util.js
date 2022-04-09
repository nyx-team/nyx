const { Client } = require('discord.js');
const fs = require('node:fs');

/**
 * Utilities specifically for Nyx
 */
class Util {
    /**
     * Logs your message
     * to Event `nyxDebug`
     * @param {string} eventType
     * @param {string} message
     * @param {Client} client
     */
    static Log(eventType, message, client) {
        client.emit('nyxDebug', `[${eventType}]: ${message}`);
    }

    /**
     * Loads in the slash commands.
     * @param {Client} client
     */
    static loadCommands(client) {
        const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

        commandFiles.forEach((file) => {
            /* eslint-disable global-require */
            /* eslint-disable import/no-dynamic-require */
            const command = require(`./commands/${file}`);

            client.commands.set(command.name, command);
        });

        this.Log('commands', 'Loaded Slash Commands.', client);
    }

    /**
     * Loads prefixed commands
     * @param {Client} client
     */
    static loadLegacyCommands(client) {
        const legacyCommandFiles = fs.readdirSync('./legacy_commands')
            .filter((file) => file.endsWith('.js'));

        legacyCommandFiles.forEach((file) => {
            const command = require(`./legacy_commands/${file}`);

            client.legacyCommands.set(command.name, command);
        });

        this.Log('commands', 'Loaded Legacy (Prefixed) Commands.', client);
    }
}

module.exports = Util;
