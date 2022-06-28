import { MessageEmbed } from 'discord.js';
import moment from 'moment';

import { CommandOptions } from '../../../typings';

export default {
    name: 'userinfo',
    description: 'Gives you your user info or someone\'s user info',
    author: 'loldonut',

    args: '[user_mention|user_id]',

    category: 'Other',

    async execute(message, args) {
        const member = args[0] == null
            ? message.member
            : message.mentions.members.first()
        ?? (await message.guild.members.fetch(args[0])
            // If the fetching is unsuccessful 
            // Use 'message.member' instead
            .catch(() => message.member));
        if (!member) {
            await message.reply({
                content: `:x: No ${member} found, or does not exist.`,
            });
            return;
        }

        const roles = (member.roles.cache.size - 1)  > 0
            ? member.roles.cache
                .map((e) => e.toString())
                // @ts-ignore
                .sort((a, b) => b.position - a.position)
                .slice(0, -1)
            : 'None';

        const hasRoles = (member.roles.cache.size - 1) > 0 ? true : false;
        const embed = new MessageEmbed()
            .setTimestamp()
            .setAuthor({
                name: `${member.user.tag}`,
                iconURL: member.user
                    .displayAvatarURL({ dynamic: true }),
            })
            .addField('Joined in', moment(member.joinedAt).format('llll'))
            .addField('Created in', moment(member.user.createdAt).format('llll'))
            .addField(`Roles${hasRoles ? ` - ${roles.length}` : ''}`,
                hasRoles === true
                    // @ts-ignore
                    ? roles.join(' ')
                    : 'None'
            )
            .setThumbnail(
                member.user.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()
            .setColor(member.displayHexColor);

        await message.reply({
            embeds: [embed],
        });
    }
} as CommandOptions;