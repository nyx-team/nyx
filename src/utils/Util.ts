import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import {
    CommandOptions,
    SlashCommandOptions,
    SlashCommandSubCommandOptions,
} from '../typings';

import { UtilLog } from '../index';

const curPathJoin = (...paths: string[]) => join(__dirname, ...paths);

/**
 * Loads in the slash commands
 *
 * @param {Client} client
 */
export function loadCommands(client: Client): void {
    const commandFiles = readdirSync(
        curPathJoin('..', 'bot', 'commands'),
    ).filter((file) => file.endsWith('.ts'));

    commandFiles.forEach(async (file) => {
        const command = (await import(
            curPathJoin('..', 'bot', 'commands', file)
        )).default as SlashCommandOptions;

        if (command?.subcommands) {
            loadSubCommand(client, curPathJoin(
                '..',
                'bot',
                'commands',
                'subcommands',
                `${file.replace('.ts', '')}`,
            ));
        }

        client.commands.set(command.name, command);
    });

    UtilLog.INFO('Loaded Slash Commands');
}

/**
 * Load prefixed commands
 *
 * @param {Client} client
 */
export function loadLegacyCommands(client: Client): void {
    const loadLegacyCommandCategories = readdirSync(
        curPathJoin('..', 'bot', 'legacy_commands'),
    ).filter((category) => !category.endsWith('.ts'));

    loadLegacyCommandCategories.forEach(async (category) => {
        const commands = readdirSync(curPathJoin(
            '..',
            'bot',
            'legacy_commands',
            category,
        )).filter((file) => file.endsWith('.ts'));

        commands.forEach(async (file) => {
            const command = (await import(curPathJoin(
                '..',
                'bot',
                'legacy_commands',
                category,
                file,
            ))).default as CommandOptions;

            client.legacyCommands.set(command.name, command);
        });
    });

    UtilLog.INFO('Loaded Legacy Commands');
}

export function loadEvents(client: Client): void {
    const eventFiles = readdirSync(
        curPathJoin('..', 'bot', 'events'),
    ).filter((file) => file.endsWith('.ts'));

    eventFiles.forEach(async (file) => {
        const event = (await import(curPathJoin('..', 'bot', 'events', file))).default;

        if (event?.once === true) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
    });

    UtilLog.INFO('Loaded Events');
}

export function loadSubCommand(client: Client, path: string): void {
    const subCommandFiles = readdirSync(path)
        .filter((file) => file.endsWith('.ts'));

    subCommandFiles.forEach(async (file) => {
        const subcommand = (await import(`${path}/${file}`)).default as SlashCommandSubCommandOptions;

        client.subCommands.set(subcommand.name, subcommand);
    });
}
