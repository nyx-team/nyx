import { DiscordAPIError, EmbedBuilder } from 'discord.js';
import { CommandOptions } from '../../../typings';

export default {
    name: 'unban',
    description: 'Unbans a user, if banned',
    author: 'loldonut',

    args: '<user_id> [reason]',
    minArgs: 1,
    reqPerms: ['BAN_MEMBERS'],
    botReqPerms: ['BAN_MEMBERS'],

    category: 'Moderation',

    async execute(message, args) {
        const userTarget = args[0];
        args.shift();
        const reason = args.join(' ') ?? null;

        message.guild.members
            .unban(
                userTarget,
                reason
                    ? `Unbanned by: ${message.author.tag} ${reason}`
                    : null,
            )
            .then((user) => {
                const embed = new EmbedBuilder()
                    .setAuthor({
                        name: `User Unbanned by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL(),
                    })
                    .addFields([{ name: 'Target', value: `${user.tag}` }])
                    .setTimestamp()
                    .setColor('Blurple');

                if (reason) embed.addFields([{ name: 'Reason', value: `${reason}` }]);

                return message.reply({
                    embeds: [embed],
                });
            })
            .catch((err) => {
                if (err instanceof DiscordAPIError) {
                    const apiError = new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`:x: Got API Error!\n\`${err.message}\``);

                    return message.reply({
                        embeds: [apiError],
                    });
                }

                const noUserFetched = new EmbedBuilder()
                    .setDescription(`:x: ${userTarget} is not banned!`)
                    .setTimestamp()
                    .setColor('Red');

                return message.reply({
                    embeds: [noUserFetched],
                });
            });
    },
} as CommandOptions;