import { EmbedBuilder } from 'discord.js';
import { CommandOptions } from '../../../typings';

export default {
    name: 'help',
    description: 'Helps with commands, what else.',
    author: 'loldonut',

    minArgs: 1,
    args: '<command name>',
    async customArgError(message) {
        const commands = [];

        message.client.legacyCommands.forEach((_, name) => commands.push(`\`${name}\``));

        const embed = new EmbedBuilder()
            .setAuthor({
                name: 'Nyx (JS) Commands',
                iconURL: message.client.user.displayAvatarURL(),
            })
            .addFields([{ name: 'Commands', value: `${commands.join(', ')}` }])
            .setColor('Blurple')
            .setTimestamp()
            .setFooter({
                text: 'Nyx JavaScript Branch',
            });

        await message.reply({
            content: ':x: **Not enough arguments passed!**',
            embeds: [embed],
        });
    },

    category: 'Other',

    async execute(message, args, client) {
        const commandName = args[0];
        const command = client.legacyCommands.get(commandName);

        if (!command) {
            await message.reply({
                content: `**No command called: ${commandName}**`,
            });
            return;
        }

        const { name, description } = command;

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `Command: ${name}`,
                iconURL: client.user.avatarURL(),
            })
            .setTimestamp()
            .setColor(0x6666ff)
            .addFields([{ name: 'Description', value: description }]);

        if (command.aliases) embed.addFields([{ name: 'Aliases', value: command.aliases.join(', ') }]);
        if (command.args) embed.addFields([{ name: 'Args', value: `\`${command.args}\`` }]);
        if (command.category) embed.addFields([{ name: 'Category', value: command.category }]);
        if (command.author) {
            const nyxGithub = 'https://github.com/nyx-team/nyx';

            const commandCommitLink = command.commit
                ? ` ([${command.commit.slice(0, 7)}](${nyxGithub}/tree/${command.commit}))`
                : '';

            embed.addFields([{
                name: 'Command Author',
                value: `This command is made by: \`${command.author}\`${commandCommitLink}`,
            }]);
        }

        await message.reply({
            embeds: [embed],
        });
    },
} as CommandOptions;