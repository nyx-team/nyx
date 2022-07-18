import {
    PermissionFlagsBits,
    SlashCommandBuilder,
} from 'discord.js';

import { SlashCommandOptions } from '../../typings';

export default {
    name: 'role',

    commandSubCommandsOnly: true,
    subcommands: ['add', 'remove'],

    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Add or remove roles.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('add')
                .setDescription('Add a role to a member.')
                .addUserOption((option) =>
                    option
                        .setName('target')
                        .setDescription('Member to add the role to.')
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName('roles')
                        .setDescription('Roles to add to the member')
                        .setRequired(true),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('remove')
                .setDescription('Removes role(s) from a member.')
                .addUserOption((option) =>
                    option
                        .setName('target')
                        .setDescription('Member to remove the role to.')
                        .setRequired(true),
                )
                .addStringOption((option) =>
                    option
                        .setName('roles')
                        .setDescription('Roles to remove to the member')
                        .setRequired(true),
                ),
        ),
} as SlashCommandOptions;
