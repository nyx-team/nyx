import { EmbedBuilder } from 'discord.js';
import moment from 'moment';

import { CommandOptions } from '../../../typings';
import toTimestamp from '../../../utils/toTimestamp';

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

        const roles = (member.roles.cache.size - 1) > 0
            ? member.roles.cache
                .map((e) => e.toString())
                // @ts-ignore
                .sort((a, b) => b.position - a.position)
                .slice(0, -1)
            : 'None';

        // These 2 variables includes the Date
        // and in Discord's Timestamp
        const joinedAt = `
${moment(member.joinedAt).format('llll')}
<t:${toTimestamp(member.joinedTimestamp)}:R>
`;
        const createdAt = `
${moment(member.user.createdAt).format('llll')}
<t:${toTimestamp(member.user.createdTimestamp)}:R>
`;

        const hasRoles = (member.roles.cache.size - 1) > 0 ? true : false;
        const embed = new EmbedBuilder()
            .setTimestamp()
            .setAuthor({
                name: `${member.user.tag}`,
                iconURL: member.user
                    .displayAvatarURL(),
            })
            .addFields([{
                name: 'Joined in',
                value: joinedAt,
            }, {
                name: 'Created in',
                value: createdAt,
            }, {
                name: `Roles${hasRoles ? ` - ${roles.length}` : ''}`,
                value: hasRoles === true
                    // @ts-ignore
                    ? roles.join(' ')
                    : 'None',
            }])
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setColor(member.displayHexColor);

        await message.reply({
            embeds: [embed],
        });
    },
} as CommandOptions;
