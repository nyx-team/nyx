import { Message } from 'discord.js';

import PrefixSchema from '../models/PrefixSchema';
import validateCommand from '../../utils/validateCommand';
import type { CommandOptions, EventOptions } from '../../typings';
import DisabledCommandsSchema from '../models/DisabledCommandsSchema';

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default {
    name: 'messageCreate',
    async execute(client, message: Message<true>) {
        if (!message.inGuild()) return;
        if (message.author.bot) return;
        if (
            !message.channel
                .permissionsFor(message.client.user)
                .has('SendMessages')
        ) return;
        console.log(message.content);
        const results = await PrefixSchema.findById(message.guild.id);
        const prefix = results ? results.prefix : ',';

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;

        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content
            .slice(matchedPrefix.length)
            .trim()
            .split(/\s+/);
        const command = args.shift().toLowerCase();

        const commands = client.legacyCommands.get(command)
            ?? client.legacyCommands.find((cmds: CommandOptions) => cmds.aliases && cmds.aliases.includes(command));
        if (!commands) return;

        // @ts-ignore
        // eslint-disable-next-line
        const disabledCommands = (await DisabledCommandsSchema.findById(message.guild.id))?.disabledCommands! as Array<string>;
        if (disabledCommands && disabledCommands.includes(command)) return;

        const isCommandValid = await validateCommand(
            message,
            commands,
            args,
            prefix,
            client,
        );
        if (isCommandValid && isCommandValid !== true) {
            message.reply(isCommandValid);
            return;
        }
        if (!isCommandValid) return;

        try {
            await commands.execute(message, args, client);
        }
        catch (err) {
            console.error(err);
            await message.channel.send({
                content: ':x: The Command Failed!',
            });
        }
    },
} as EventOptions;
