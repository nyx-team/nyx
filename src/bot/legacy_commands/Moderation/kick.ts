import { GuildMember, Message, EmbedBuilder } from 'discord.js';
import { CommandOptions } from '../../../typings';

export default {
  name: 'kick',
  description: 'Kicks a user off the Server',
  author: 'loldonut',

  args: '<target_member> [reason]',
  minArgs: 1,
  reqPerms: ['KickMembers'],
  botReqPerms: ['KickMembers'],

  category: 'Moderation',

  async execute(message: Message, args: Array<string>) {
    const member =
      message.mentions.members.first() ??
      (message.guild.members.cache.get(args[0]) as GuildMember);
    const reason =
      args.length > 1 ? args.slice(1, args.length).join(' ') : 'None';

    if (!member.kickable) {
      await message.reply({
        content: ':x: **I can\'t kick this User!**',
      });
      return;
    }

    try {
      await member.kick(`Kicked by: ${message.author.tag} Reason: ${reason}`);

      const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTimestamp()
        .setAuthor({
          name: `${message.author.tag}`,
          iconURL: message.author.displayAvatarURL(),
        })
        .addFields([{ name: 'Kicked', value: `\`${member.user.tag}\`` }])
        .setFooter({
          text: `ID: ${member.id}`,
          iconURL: member.displayAvatarURL(),
        });

      // If there is a reason
      // then add a field
      // I check for args length instead
      // just in case user puts `None` on the `reason` arg
      if (args.length > 1) embed.addFields([{ name: 'Reason', value: reason }]);

      await message.reply({
        embeds: [embed],
      });
    }
    catch (err) {
      console.error(err);
      await message.reply({
        content: ':x: **An error occured while trying to kick the User!**',
      });
    }
  },
} as CommandOptions;
