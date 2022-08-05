import { CommandOptions } from '../../../typings';
import DisabledCommandsSchema from '../../models/DisabledCommandsSchema';

export default {
    name: 'enable',
    description: 'Disables PREFIXED commands.',

    minArgs: 1,
    args: '"<...commands_to_enable>"',
    reqPerms: ['ManageGuild'],

    category: 'Config',
    async execute(message, args) {
        const quotesRegex = /".*?"/g;
        const commands = args.join(' ').match(quotesRegex);

        if (!commands) {
            await message.reply({
                content: `
**No commands specified!**
Format should be like this:
\`\`\`
enable "purge" "avatar"
\`\`\`
And so on...
                `,
            });
            return;
        }

        // @ts-ignore
        // eslint-disable-next-line
        const disabledCommandsList = (await DisabledCommandsSchema.findById(message.guild.id))?.disabledCommands! as Array<string>;

        const enabledCommands = [];
        for await (let command of commands) {
            command = command.replaceAll('"', '');
            if (!disabledCommandsList.includes(command)) continue;

            // @ts-ignore
            await DisabledCommandsSchema.findOneAndUpdate({
                _id: message.guild.id,
            }, {
                _id: message.guild.id,
                $pull: {
                    // @ts-ignore
                    disabledCommands: command,
                },
            }, { upsert: true });

            enabledCommands.push(`\`${command}\``);
        }

        await message.reply({
            content: `:white_check_mark: **Enabled commands:** ${enabledCommands.join(', ')}`,
        });
    },
} as CommandOptions;
