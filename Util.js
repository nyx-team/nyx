const { Client } = require('discord.js');

const { readdirSync } = require('fs');
const { join } = require('path');

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
        const commandFiles = readdirSync(
            this.curPathJoin('commands')
        ).filter(
            (file) => file.endsWith('.js')
        );

        commandFiles.forEach((file) => {
            const command = require(this.curPathJoin('commands', file));

            client.commands.set(command.name, command);
        });

        this.Log('commands', 'Loaded Slash Commands.', client);
    }

    /**
     * Loads prefixed commands
     * @param {Client} client
     */
    static loadLegacyCommands(client) {
        const legacyCommandCategories = readdirSync(
            this.curPathJoin('legacy_commands')
        ).filter((category) => !category.endsWith('.js'));

        legacyCommandCategories.forEach((category) => {
            const commands = readdirSync(
                `./legacy_commands/${category}`
            ).filter((file) => file.endsWith('.js'));

            commands.forEach((file) => {
                const command = require(`./legacy_commands/${category}/${file}`);

                client.legacyCommands.set(command.name, command);
            });
        });

        this.Log('commands', 'Loaded Legacy (Prefixed) Commands.', client);
    }

    static loadEvents(client) {
        const eventFiles = readdirSync(
            './events'
        ).filter((file) =>
            file.endsWith('.js')
        );

        eventFiles.forEach((file) => {
            const events = require(`./events/${file}`);

            if (events.once && events.once === true) {
                client.once(events.name, async (...args) =>
                    events.execute(client, ...args)
                );
            } else {
                client.on(events.name, async (...args) =>
                    events.execute(client, ...args)
                );
            }
        });
    }

    static curPathJoin(dir, ...otherPaths) {
        return join(__dirname, dir, ...otherPaths);
    }
}

module.exports = Util;
