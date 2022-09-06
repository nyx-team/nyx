import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { SlashCommandOptions } from '../../typings';

export default {
  name: '8ball',
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the 8ball.')
    .addStringOption((option) =>
      option.setName('question').setDescription('the Question for the 8ball.'),
    ),

  async execute(interaction, options) {
    const question = options.getString('question', false);

    const responses = ['Yes', 'No'];
    const n = Math.floor(Math.random() * responses.length);
    const BotChose = responses[n];

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .setColor(Colors.Blurple);

    if (question) {
      embed.addFields({ name: question, value: BotChose });
    }
    else {
      embed.setDescription(BotChose);
    }

    await interaction.reply({ embeds: [embed] });
  },
} as SlashCommandOptions;
