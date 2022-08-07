import { DiscordAPIError, EmbedBuilder, User } from 'discord.js';

import { CommandOptions } from '../../../typings';

export default {
  name: 'unban',
  description: 'Unbans a user, if banned',
  author: 'loldonut',

  args: '<user_id> [reason]',
  minArgs: 1,
  reqPerms: ['BanMembers'],
  botReqPerms: ['BanMembers'],

  category: 'Moderation',

  async execute(message, args) {
    const userTarget = args[0];
    args.shift();
    const reason = args.join(' ') ?? null;

    try {
      const user = (await message.guild.members.kick(
        userTarget,
        reason ? `Unbanned by: ${message.author.tag} ${reason}` : null,
      )) as User;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `User Unbanned by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL(),
        })
        .addFields([
          {
            name: 'Target',
            value: `${user.tag ?? 'Was not able to get the user\'s tag.'}`,
          },
        ])
        .setTimestamp()
        .setColor('Blurple');

      if (reason) {
        embed.addFields([{ name: 'Reason', value: `${reason}` }]);
      }

      await message.reply({
        embeds: [embed],
      });
    }
    catch (err) {
      if (err instanceof DiscordAPIError) {
        const apiError = new EmbedBuilder()
          .setColor('Red')
          .setDescription(`:x: Got API Error!\n\`${err.message}\``);

        await message.reply({
          embeds: [apiError],
        });
        return;
      }

      const noUserFetched = new EmbedBuilder()
        .setDescription(`:x: ${userTarget} is not banned!`)
        .setTimestamp()
        .setColor('Red');

      await message.reply({
        embeds: [noUserFetched],
      });
    }
  },
} as CommandOptions;
