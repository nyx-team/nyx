import { MessageEmbed } from 'discord.js';
import { CommandOptions } from '../../../typings';

export default {
    name: 'avatar',
    aliases: ['av'],
    description: 'Shows your current avatar.',
    author: 'loldonut',

    args: '[user_mention|user_id]',

    category: 'Other',
    async execute(message, args) {
        const member = args?.[0]
            ? (await message.guild.members.fetch(args[0])
                .catch(() => message.mentions.members.first())
            )
            : message.member; 

        const embed = new MessageEmbed()
            .setAuthor({
                name: `${member.user.tag} Avatar`,
                iconURL: member.displayAvatarURL({ dynamic: true })
            })
            .setImage(member.displayAvatarURL({ dynamic: true }))
            .setColor(member.displayColor)
            .setTimestamp();

        await message.reply({
            embeds: [embed]
        });
    }
} as CommandOptions;