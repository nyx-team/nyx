import { readdirSync } from 'fs';
import { join } from 'path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

import { Config, SlashCommandOptions } from '../typings';
import loadConfig from './loadConfig';

/**
 * Deploy commands to the client (Globally)
 * 
 * @param {boolean} dev - If it should be deployed on the dev bot
 */
export default async function deployCommands(dev: boolean): Promise<void> {
    const { token, devToken } = loadConfig() as Config;

    const commands = [];
    const commandFiles = readdirSync(join(__dirname, '..', 'bot', 'commands'))
        .filter((file) => file.endsWith('.ts'));
    
    commandFiles.forEach(async (file) => {
        const { data } = (await import(
            join(__dirname, '..', 'bot', 'commands', file)
        )).default as SlashCommandOptions;
        commands.push(data.toJSON());
    });

    // TODO: make this customizable
    const clientId = '990926099280175125';

    const rest = new REST({ version: '9' })
        .setToken(dev === true ? devToken : token);
    
    try {
        console.log('Started refreshing application (/) commands.');
    
        await rest.put(Routes.applicationCommands(clientId), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}