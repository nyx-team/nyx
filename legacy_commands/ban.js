const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a user off your guild',
    author: 'loldonut',

    args: '<user> [reason]',
    minArgs: 1,
    reqPerms: ['BAN_MEMBERS'],

    category: 'Moderation',

    async execute(message, args) {
        const targetUser = message.mentions.members.first()
            ?? args[0];
        args.shift();
        const reason = args.join(' ') ?? null;

        try {
            const bannedUser = await message.guild.members.ban(targetUser, {
                reason: reason != null 
                    ? `Banned by: ${message.author.tag} ${reason}` 
                    : null,
            });

            const embed = new MessageEmbed()
                .setAuthor({
                    name: `User banned by ${message.author.tag}`,
                    iconURL: message.author
                        .displayAvatarURL({ dynamic: true }),
                })
                .addField('Target', `${bannedUser.user?.tag ?? bannedUser.tag ?? bannedUser}`)
                .setTimestamp()
                .setColor('BLURPLE');

            if (reason) embed.addField('Reason', `${reason}`);

            await message.reply({
                embeds: [embed],
            });
        } catch (err) {
            if (err.code === 50013) {
                return message.reply({
                    content: ':x: I don\'t have permission to ban the user! Bot might have a lower hierarchy than the user you\'re trying to ban, or just the Bot doesn\'t have the permission to ban.',
                });
            }

            return message.reply({
                content: ':x: An Error occured while trying to ban the user!',
            });
        }
    },
}
