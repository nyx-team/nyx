import { Colors, EmbedBuilder } from 'discord.js';

import { SlashCommandSubCommandOptions } from '../../../../typings';
import ServerNotesSchema from '../../../models/ServerNotesSchema';

export default {
  name: 'server',
  async execute(interaction, options) {
    await interaction.deferReply();
    const note = options.getString('note');

    // @ts-ignore
    const noteQuery = await ServerNotesSchema.findById(interaction.guild.id);
    if (!noteQuery) {
      await interaction.reply({
        content: ':x: | No note channel is set for this server.',
        ephemeral: true,
      });
      return;
    }

    const noteChannel = interaction.guild.channels.cache.get(
      noteQuery?.channelId,
    );

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.member.displayName} | ${interaction.user.tag}`,
        iconURL: interaction.member.displayAvatarURL(),
      })
      .addFields({
        name: 'Note',
        value: note,
      })
      .setColor(Colors.Blurple)
      .setTimestamp();

    // @ts-ignore
    await noteChannel.send({
      embeds: [embed],
    });

    await interaction.editReply({
      content: ':white_check_mark: | Note sent!',
    });
  },
} as SlashCommandSubCommandOptions;
