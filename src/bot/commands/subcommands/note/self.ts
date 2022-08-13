import { Colors, EmbedBuilder } from 'discord.js';

import { SlashCommandSubCommandOptions } from '../../../../typings';

export default {
  name: 'self',
  async execute(interaction, option) {
    const note = option.getString('note');
    const dm = await interaction.user.createDM();

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor(Colors.Blurple)
      .setTimestamp()
      .addFields({
        name: 'Note!',
        value: note,
      });

    try {
      await dm.send({
        embeds: [embed],
      });
    }
    catch {
      await interaction.reply({
        content: ':x: | Was not able to sent the Note!',
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: ':white_check_mark: | Note sent!',
      ephemeral: true,
    });
  },
} as SlashCommandSubCommandOptions;
