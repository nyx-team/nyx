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

    static loadEvents(client) {
        const eventFiles = fs.readdirSync('./events')
            .filter((file) => file.endsWith('.js'));

        eventFiles.forEach((file) => {
            const events = require(`./events/${file}`);

            if (events.once && events.once === true) {
                client.once(events.name, async (...args) => events.execute(client, ...args));
            } else {
                client.on(events.name, async (...args) => events.execute(client, ...args));
            }
        });
    }
}

module.exports = Util;
