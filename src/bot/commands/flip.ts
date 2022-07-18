import { SlashCommandBuilder } from 'discord.js';
import { SlashCommandOptions } from '../../typings';

export default {
    name: 'flip',
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flip a coin'),

    async execute(interaction) {
        const coin = ['Heads', 'Tails'];
        const n = Math.floor(Math.random() * coin.length);
        const flipped = coin[n];

        await interaction.reply({
            content: `Results: **${flipped}**`,
        });
    },
} as SlashCommandOptions;