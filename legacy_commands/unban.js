const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unbans a user, if banned',
    author: 'loldonut',

    args: '<user_id> [reason]',
    minArgs: 1,
    reqPerms: ['BAN_MEMBERS'],

    category: 'Moderation',

    /**
     * @param {Message} message
     * @param {string[]} args
     */
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
                const noUserFetched = new MessageEmbed()
                    .setDescription(`:x: ${userTarget} is not banned!`)
                    .setTimestamp()
                    .setColor('RED');

                return message.reply({
                    embeds: [noUserFetched],
                });
            });
    },
}
