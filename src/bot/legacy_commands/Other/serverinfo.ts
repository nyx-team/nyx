import { EmbedBuilder, time, TimestampStyles } from 'discord.js';
import { CommandOptions } from '../../../typings';

export default {
  name: 'serverinfo',
  description: 'Shows info about the server',
  author: 'loldonut',

  category: 'Other',
  async execute(message) {
    const guild = await message.guild.fetch();
    const members = await message.guild.members.fetch({ withPresences: true });
    const owner = await guild.fetchOwner();

    const name = guild.name;
    const icon = guild.iconURL();

    const memberCount = members.size;
    const membersOnline = members.filter(
      (member) => member.presence?.status === 'online',
    );

    const embed = new EmbedBuilder()
      .setAuthor({
        name,
        iconURL: icon,
      })
      .setTimestamp()
      .setThumbnail(icon)
      .addFields([
        {
          name: 'Member Count',
          value: `${memberCount}`,
          inline: true,
        },
        {
          name: 'Members Online',
          value: `${membersOnline.size}`,
          inline: true,
        },
        {
          name: 'Roles Count',
          value: `${guild.roles.cache.size}`,
          inline: true,
        },
        {
          name: 'Server Owner',
          value: `${owner.user.tag}`,
          inline: true,
        },
        {
          name: 'Server ID',
          value: `${guild.id}`,
          inline: true,
        },
        {
          name: 'Server Created',
          value: `${time(guild.createdAt, TimestampStyles.LongDateTime)}`,
          inline: true,
        },
      ])
      .setColor(guild.roles.highest.color || 'Random');

    await message.reply({
      embeds: [embed],
    });
  },
} as CommandOptions;
