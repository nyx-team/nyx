import { readdirSync } from 'fs';
import { join } from 'path';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { Snowflake } from 'discord.js';

import { SlashCommandOptions } from '../typings';

/**
 * Deploy commands to the client (Globally)
 *
 * @param {boolean} dev - If it should be deployed on the dev bot
 */
export default async function deployCommands(token: string, clientId: Snowflake): Promise<void> {
    const commands = [];
    const commandFiles = readdirSync(join(__dirname, '..', 'bot', 'commands'))
        .filter((file) => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const { data } = (await import(
            join(__dirname, '..', 'bot', 'commands', file)
        )).default as SlashCommandOptions;

        commands.push(data.toJSON());
    }

    const rest = new REST({ version: '10' })
        .setToken(token);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(clientId), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}