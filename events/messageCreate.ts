import PrefixSchema from '../models/PrefixSchema';
import validateCommand from '../utils/validateCommand';
import type { CommandOptions, EventOptions } from '../typings/index';

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default {
    name: 'messageCreate',
    async execute(client, message) {
        if (
            !message.channel
                .permissionsFor(message.client.user)
                .has('SEND_MESSAGES')
        ) return;
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

        const isCommandValid = await validateCommand(
            message,
            commands,
            args,
            prefix,
            client
        );
        if (isCommandValid && isCommandValid !== true) {
            return message.reply(isCommandValid);
        }
        if (!isCommandValid) return;

        try {
            await commands.execute(message, args, client);
        } catch (err) {
            console.error(err);
            await message.channel.send(':x: The Command Failed!');
        }
    },
} as EventOptions;
