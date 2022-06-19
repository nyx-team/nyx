import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommandOptions } from '../typings';

export default {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Sends the ping of the Bot'),

    async execute(interaction) {
        await interaction.reply({
            content: `Pong! | ${interaction.client.ws.ping}ms`,
        });
    }
} as SlashCommandOptions;
