import { DiscordAPIError, MessageEmbed } from 'discord.js';
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
                    : null
            )
            .then((user) => {
                const embed = new MessageEmbed()
                    .setAuthor({
                        name: `User Unbanned by ${message.author.tag}`,
                        iconURL: message.author
                            .displayAvatarURL({ dynamic: true }),
                    })
                    .addField('Target', `${user.tag}`)
                    .setTimestamp()
                    .setColor('BLURPLE');

                if (reason) embed.addField('Reason', `${reason}`);

                return message.reply({
                    embeds: [embed],
                });
            })
            .catch((err) => {
                if (err instanceof DiscordAPIError) {
                    const apiError = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`:x: Got API Error!\n\`${err.message}\``);

                    return message.reply({
                        embeds: [apiError],
                    });
                }

                const noUserFetched = new MessageEmbed()
                    .setDescription(`:x: ${userTarget} is not banned!`)
                    .setTimestamp()
                    .setColor('RED');

                return message.reply({
                    embeds: [noUserFetched],
                });
            });
    }
} as CommandOptions;