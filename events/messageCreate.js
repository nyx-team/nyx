// For autocompletion/IntelliSense
const {
    Client,
    Message,
    MessageEmbed,
} = require('discord.js');

const PrefixSchema = require('../models/PrefixSchema');

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(client, message) {
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
            ?? client.legacyCommands.find((cmds) => cmds.aliases && cmds.aliases.includes(command));
        if (!commands) return;

        const isCommandValid = await this.validateCommand(
            message,
            commands,
            args,
            prefix
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

    async validateCommand(
        message,
        command,
        args,
        prefix,
        client
    ) {
        if (
            command?.reqPerms &&
            message.member.permissions.has(command.reqPerms) &&
            !message.guild.me.permissions.has(command?.reqPerms)
        ) {
            return {
                content: `:x: **The Bot does not have the required permission to run the command!**\nPermissions needed: \`${command.reqPerms.join(', ')}\``,
            };
        }

        // If message author
        // has the required permissions
        // to run the command.
        if (
            command?.reqPerms &&
            !message.member.permissions.has(command.reqPerms)
        ) {
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
                        `:x: **Not Enough Arguments passed!**\nDo \`${prefix}help ${command.name}\` for more info.`
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
    },
};
