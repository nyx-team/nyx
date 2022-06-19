import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

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
        ).filter((file) => file.endsWith('.js'));

        commandFiles.forEach(async (file) => {
            const command = (await import(
                curPathJoin('..', 'commands', file)
            )).default;

            client.commands.set(command.name, command);
        });

        this.Log('commands', 'Loaded Slash Commands', client);
    }
}
