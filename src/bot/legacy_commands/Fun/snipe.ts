import { Message, EmbedBuilder } from 'discord.js';
import { CommandOptions } from '../../../typings';

export default {
  name: 'snipe',
  description: 'Snipes a message that has been deleted on the target channel',

  category: 'Fun',

  async execute(message: Message, _, client) {
    const msg = client.snipedMessages.get(message.channel.id);

    if (!msg) {
      message.reply({
        content: ':x: No message to snipe!',
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${msg.author.tag}`,
        iconURL: msg.member.displayAvatarURL(),
      })
      .setDescription(`>>> ${msg.content}`)
      .setColor(`${msg.member.displayHexColor}`)
      .setTimestamp()
      .setImage(msg.attachments.first()?.proxyURL ?? null);

    await message.reply({
      embeds: [embed],
    });
  },
} as CommandOptions;
