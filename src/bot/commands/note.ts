import { SlashCommandBuilder } from 'discord.js';

import { SlashCommandOptions } from '../../typings';

export default {
  name: 'note',

  subcommands: ['server', 'self'],
  commandSubCommandsOnly: true,

  data: new SlashCommandBuilder()
    .setName('note')
    .setDescription('Take a note!')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('server')
        .setDescription('Takes a note from the server\'s note channel, if any.')
        .addStringOption((option) =>
          option
            .setName('note')
            .setDescription('the Note')
            .setRequired(true)
            .setMaxLength(1000)
            .setMinLength(5),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('setup')
        .setDescription('Set ups the note command for the server')
        .addChannelOption((option) =>
          option.setName('channel').setDescription('the Channel to target'),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('self')
        .setDescription('Take a note for your self')
        .addStringOption((option) =>
          option
            .setName('note')
            .setDescription('the Note')
            .setRequired(true)
            .setMaxLength(1000)
            .setMinLength(5),
        ),
    ),
} as SlashCommandOptions;
