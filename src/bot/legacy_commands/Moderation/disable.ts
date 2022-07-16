import { MessageEmbed } from 'discord.js';

import { CommandOptions } from '../../../typings';
import DisabledCommandsSchema from '../../models/DisabledCommandsSchema';

export default {
    name: 'disable',
    description: 'Disables PREFIXED commands.',

    minArgs: 1,
    args: '<..."commands_to_disable"|list>',
    reqPerms: ['MANAGE_GUILD'],

    category: 'Moderation',
    async execute(message, args) {
        // @ts-ignore
        // eslint-disable-next-line
        const disabledCommandsList = (await DisabledCommandsSchema.findById(message.guild.id))?.disabledCommands! as Array<string>;

        if (args[0] === 'list') {
            const embed = new MessageEmbed()
                .setTitle(':information_source: List of disabled commands')
                .setDescription(`
\`\`\`
${disabledCommandsList.join(', ')}
\`\`\`
                `)
                .setColor('BLURPLE');

            await message.reply({
                embeds: [embed],
            });
            return;
        }

        const quotesRegex = /".*?"/g;
        const commands = args
            .join(' ')
            .match(quotesRegex)
            .filter((v) => v !== 'disable');

        if (!commands) {
            await message.reply({
                content: `
**No commands specified!**
Format should be like this:
\`\`\`
disable "purge" "avatar"
\`\`\`
And so on...
                `,
            });
            return;
        }

        const disabledCommands = [];
        for await (let command of commands) {
            command = command.replaceAll('"', '');
            const actualCommand = message.client.legacyCommands.find((v) => v.name === command);

            if (!actualCommand) continue;
            if (disabledCommandsList.includes(actualCommand.name)) continue;

            await DisabledCommandsSchema.findOneAndUpdate({
                _id: message.guild.id,
            }, {
                _id: message.guild.id,
                $push: {
                    // @ts-ignore
                    disabledCommands: actualCommand.name,
                },
            }, { upsert: true });

            disabledCommands.push(`\`${actualCommand.name}\``);
        }

        await message.reply({
            content: `:white_check_mark: **Disabled commands:** ${disabledCommands.join(', ')}`,
        });
    },
} as CommandOptions;