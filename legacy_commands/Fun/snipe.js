const {
    Message,
    MessageEmbed,
    Client,
} = require('discord.js');

module.exports = {
    name: 'snipe',
    description: 'Snipes a message that has been deleted on the target channel',

    reqPerms: ['MANAGE_MESSAGES'],

    category: 'Fun',

    /**
     * Snipes a message that has been deleted on the target channel
     * @param {Message} message
     * @param {string[]} args
     */
    async execute(message) {
        const msg = message.client.snipedMessages.get(message.channel.id);

        if (!msg) {
            return message.reply({
                content: `:x: No message to snipe!`,
            });
        }

        const embed = new MessageEmbed()
            .setAuthor({
                name: `${msg.author.tag}`,
                iconURL: msg.member
                    .displayAvatarURL({ dynamic: true }),
            })
            .setDescription(`>>> ${msg.content}`)
            .setColor(`${msg.member.displayHexColor}`)
            .setTimestamp()
            .setImage(msg.attachments.first()?.proxyURL ?? null);

        await message.reply({
            embeds: [embed],
        });
    },
};
