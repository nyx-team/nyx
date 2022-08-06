import { Colors, EmbedBuilder } from 'discord.js';

import { CommandOptions } from '../../../typings';
import { version } from '../../../../package.json';

export default {
  name: 'botinfo',
  description: 'Information about the Bot',

  category: 'Other',
  async execute(message) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: message.client.user.tag,
        iconURL: message.client.user.displayAvatarURL(),
      })
      .setTimestamp()
      .setFooter({
        text: `At version v${version} | Ping ${message.client.ws.ping}ms`,
      })
      .setColor(Colors.Blurple)
      .addFields(
        {
          name: 'Guild Count',
          value: message.client.guilds.cache.size.toString(),
        },
        {
          name: 'Serving',
          value: `${message.client.users.cache.size} user(s)`,
        },
      );

    await message.reply({ embeds: [embed] });
  },
} as CommandOptions;
