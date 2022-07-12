import {
    Client,
    Message,
    MessageEmbed,
    MessageOptions,
} from 'discord.js';

import { CommandOptions } from '../typings';
import { PermissionsReadable } from './Constants';

export default async function validateCommand(
    message: Message,
    command: CommandOptions,
    args: Array<string>,
    prefix: string,
    client: Client,
): Promise<boolean | MessageOptions> {
    if (
        command?.botReqPerms &&
        !message.guild.me.permissions.has(command.botReqPerms)
    ) {
        // Convert required perms into a readable one
        const reqPerms = command.botReqPerms.map((e) => PermissionsReadable[e]);
        return {
            content: `:x: **The Bot does not have the required permission to run the command!**\nPermission(s) needed: \`${reqPerms.join(', ')}\``,
        };
    }

    // If message author
    // has the required permissions
    // to run the command.
    if (
        command?.reqPerms &&
        !message.member.permissions.has(command.reqPerms)
    ) {
        if (
            command?.permissionError &&
            typeof command.permissionError === 'function'
        ) {
            command.permissionError(message, args);
            return;
        }
        return false;
    }

    // Check if command needs a minium args
    // If there is then
    // Send an error if args length
    // does not meet minArgs
    if (
        command?.minArgs &&
        args.length < command?.minArgs
    ) {
        if (!command?.customArgError) {
            const embed = new MessageEmbed()
                .setColor('DARK_BLUE')
                .setDescription(
                    `:x: **Not Enough Arguments passed!**\nDo \`${prefix}help ${command.name}\` for more info.`,
                );
            return {
                embeds: [embed],
            };
        }

        if (typeof command?.customArgError === 'function') {
            await command?.customArgError(message, client);
            return false;
        }
    }

    return true;
}
