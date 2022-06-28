import { Message, MessageEmbed } from 'discord.js';
import { CommandOptions } from '../../../typings';

export default {
    name: 'snipe',
    description: 'Snipes a message that has been deleted on the target channel',

    category: 'Fun',

    async execute(message: Message) {
        const msg = message.client.snipedMessages.get(message.channel.id);

        if (!msg) {
            message.reply({
                content: ':x: No message to snipe!',
            });
            return;
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
    }
} as CommandOptions;