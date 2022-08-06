import {
  Colors,
  EmbedBuilder,
  OAuth2Scopes,
  PermissionFlagsBits,
} from 'discord.js';
import { config } from '../../..';

import { CommandOptions } from '../../../typings';

export default {
  name: 'invite',
  aliases: ['links'],
  description: 'Links for Nyx Discord',

  category: 'Other',
  async execute(message) {
    // Invite Link for the Bot
    // With `bot` and `application.commands` scope
    const inviteLink = message.client.generateInvite({
      permissions: [
        PermissionFlagsBits.Administrator,
        PermissionFlagsBits.AddReactions,
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.ManageGuild,
        PermissionFlagsBits.ManageMessages,
        PermissionFlagsBits.EmbedLinks,
        PermissionFlagsBits.KickMembers,
        PermissionFlagsBits.BanMembers,
        PermissionFlagsBits.ManageRoles,
      ],
      scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
    });

    const supportServerLink = `https://discord.gg/invite/${config.inviteCode}`;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: message.client.user.tag,
        iconURL: message.client.user.displayAvatarURL(),
      })
      .setTimestamp()
      .setColor(Colors.Blurple)
      .addFields({
        name: 'Links',
        value: `[Bot Invite Link](${inviteLink})\n[Bot Support Server](${supportServerLink})`,
      });

    await message.reply({ embeds: [embed] });
  },
} as CommandOptions;
