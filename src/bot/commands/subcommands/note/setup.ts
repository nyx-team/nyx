import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChannelType,
  Colors,
  ComponentType,
  EmbedBuilder,
  PermissionFlagsBits,
} from 'discord.js';

import ServerNotesSchema from '../../../models/ServerNotesSchema';
import { SlashCommandSubCommandOptions } from '../../../../typings';

export default {
  name: 'setup',
  async execute(interaction, options) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {return;}

    const channel = options.getChannel('channel', false);
    if (!channel) {
      const currentNoteChannelId = (
        // @ts-ignore
        await ServerNotesSchema.findById(interaction.guild.id)
      )?.channelId;
      const currentNoteChannel = currentNoteChannelId
        ? interaction.guild.channels.cache.get(currentNoteChannelId)
        : 'None';

      const noteConfig = new EmbedBuilder()
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL(),
        })
        .setColor(Colors.Blurple)
        .addFields({
          name: 'Note Channel',
          value: `**Current note channel:** ${currentNoteChannel}`,
        });

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId('NoteChannelDelete')
          .setLabel('Turn off Note Channel')
          .setStyle(ButtonStyle.Danger),
      );

      const noteInfoMessage = await interaction.reply({
        embeds: [noteConfig],
        components: [row],
      });

      const filter = (i: ButtonInteraction) =>
        i.memberPermissions.has(PermissionFlagsBits.ManageGuild) &&
        i.customId === 'NoteChannelDelete' &&
        interaction.user.id === i.user.id;

      const collector = noteInfoMessage.createMessageComponentCollector({
        // @ts-ignore
        filter,
        time: 10e3,
        maxComponents: 1,
        componentType: ComponentType.Button,
      });

      collector.on('collect', async (i) => {
        await i.deferReply();

        await ServerNotesSchema.findByIdAndDelete(interaction.guild.id);

        await interaction.editReply({ components: [] });
        await i.followUp({
          content:
            ':white_check_mark: | Turned off the note channel for this server.',
        });
      });

      return;
    }

    if (channel.type === ChannelType.GuildCategory) {
      await interaction.reply({
        content:
          ':x: | Cannot set a note channel to a category! Select a channel instead.',
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply();

    // @ts-ignore
    await ServerNotesSchema.findOneAndUpdate(
      {
        _id: interaction.guild.id,
      },
      {
        _id: interaction.guild.id,
        channelId: channel.id,
      },
      { upsert: true },
    );

    await interaction.editReply({
      content: `:white_check_mark: | Successfully set the notes channel to ${channel}`,
    });
  },
} as SlashCommandSubCommandOptions;
