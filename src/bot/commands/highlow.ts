import {
  ButtonInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommandOptions } from '../../typings';

import { randomInt } from 'crypto';

export default {
  name: 'highlow',
  data: new SlashCommandBuilder()
    .setName('highlow')
    .setDescription('Guess if the number is higher or lower.'),

  async execute(interaction) {
    let correctNum = randomInt(1, 200);
    const baseNum = randomInt(50, 100);

    // If the correct number is the same as the base number
    // then either add or minus the correct number
    if (correctNum === baseNum) {
      correctNum =
        Math.random() > 0.5
          ? correctNum - Math.floor(Math.random() * 2)
          : correctNum + Math.floor(Math.random() * 2);
    }

    const high = new ButtonBuilder()
      .setCustomId('high')
      .setLabel('High')
      .setStyle(ButtonStyle.Success);

    const low = new ButtonBuilder()
      .setCustomId('low')
      .setLabel('Low')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
      high,
      low,
    ]);

    await interaction.reply({
      content: `Number to base answer: **${baseNum}**\n**Higher or Lower?**`,
      components: [row],
    });

    const filter = (i: ButtonInteraction): boolean =>
      ['high', 'low'].includes(i.customId) && i.user.id === interaction.user.id;

    // A collector for the Buttons, only lasts for 15 seconds
    const collector = interaction.channel.createMessageComponentCollector({
      // @ts-ignore
      filter,
      time: 1000 * 10,
    });

    collector.on('collect', async (i) => {
      high.setDisabled(true);
      low.setDisabled(true);

      await i.update({ components: [row] });

      if (i.customId === 'high') {
        if (correctNum > baseNum) {
          await i.followUp({
            content: '**Your answer was correct! (Chose High)**',
          });
        }
        else {
          await i.followUp({
            content: '**:x: You chose the wrong answer! (Chose High)**',
          });
        }
      }
      else if (i.customId === 'low') {
        if (correctNum < baseNum) {
          await i.followUp({
            content: '**Your answer was correct! (Chose Low)**',
          });
        }
        else {
          await i.followUp({
            content: '**:x: Your chose the wrong answer! (Chose Low)**',
          });
        }
      }
    });
  },
} as SlashCommandOptions;
