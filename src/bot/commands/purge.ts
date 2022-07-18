import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v10';

import { SlashCommandOptions } from '../../typings';

export default {
    name: 'purge',
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purges messages / Bulk deletes messages')
        .addNumberOption((option) =>
            option
                .setName('amount')
                .setDescription('Amount of messages you want to be deleted')
                .setRequired(true),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction, options) {
        const amount = options.getNumber('amount');

        const { size } = await interaction.channel.bulkDelete(amount, true);

        await interaction.reply({
            content: `**Purged ${size} messages(s)!**`,
        });

        /* eslint-disable no-promise-executor-return */
        const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
        await sleep();

        await interaction.deleteReply();
    },
} as SlashCommandOptions;
