import { SlashCommandBuilder } from 'discord.js';
import { SlashCommandOptions } from '../../typings';

import { randomInt } from 'crypto';

export default {
  name: 'dice',
  data: new SlashCommandBuilder().setName('dice').setDescription('Roll a dice!'),

  async execute(interaction) {
    const rolled = randomInt(1, 6);

    await interaction.reply({
      content: `**Rolled \`${rolled}\`!**`,
    });
  },
} as SlashCommandOptions;
