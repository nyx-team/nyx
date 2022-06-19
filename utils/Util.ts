import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import { CommandOptions, EventOptions, SlashCommandOptions } from '../typings';

const curPathJoin = (...paths: string[]) => join(__dirname, ...paths);

export default class Util {
    /**
     * Logs your message
     * to Event `nyxDebug`
     *
     * @param {string} eventType
     * @param {string} message
     * @param {Client} client
     */
    public static Log(
        eventType: string,
        message: string,
        client: Client
    ): void {
        client.emit('nyxDebug', `[${eventType}]: ${message}`);
    }

    /**
     * Loads in the slash commands
     * 
     * @param {Client} client
     */
    public static loadCommands(client: Client): void {
        const commandFiles = readdirSync(
            curPathJoin('..', 'commands')
        ).filter((file) => file.endsWith('.ts'));

        commandFiles.forEach(async (file) => {
            const command = (await import(
                curPathJoin('..', 'commands', file)
            )).default as SlashCommandOptions;

            client.commands.set(command.name, command);
        });

        this.Log('commands', 'Loaded Slash Commands', client);
    }

    /**
     * Load prefixed commands
     *
     * @param {Client} client
     */
    public static loadLegacyCommands(client: Client): void {
        const loadLegacyCommandCategories = readdirSync(
            curPathJoin('..', 'legacy_commands')
        ).filter((category) => !category.endsWith('.ts'));

        loadLegacyCommandCategories.forEach(async (category) => {
            const commands = readdirSync(curPathJoin(
                '..',
                'legacy_commands',
                category
            )).filter((file) => file.endsWith('.ts'));

            commands.forEach(async (file) => {
                const command = (await import(curPathJoin(
                    '..',
                    'legacy_commands',
                    category,
                    file
                ))).default as CommandOptions;

                client.legacyCommands.set(command.name, command);
            });
        });

        this.Log('commands', 'Loaded Legacy Commands', client);
    }

    public static loadEvents(client: Client): void {
        const eventFiles = readdirSync(
            curPathJoin('..', 'events')
        ).filter((file) => file.endsWith('.ts'));
 
        eventFiles.forEach(async (file) => {
            const event = (await import(curPathJoin('..', 'events', file))).default as EventOptions;

            if (event?.once === true) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }
        });

        this.Log('events', 'Loaded Events', client);
    }
}
