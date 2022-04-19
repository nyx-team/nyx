// For autocompletion/IntelliSense
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(client, message) {
        // Hardcoded prefix for now
        // TODO: Make prefix customizable
        const prefix = ',';
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length)
            .trim()
            .split(/\s+/);
        const command = args.shift().toLowerCase();

        const commands = client.legacyCommands.get(command);
        if (!commands) return;

        const isCommandValid = this.validateCommand(message, commands, args, prefix);
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

    validateCommand(message, command, args, prefix) {
        // Check if command needs a minium args
        // If there is then
        // Send an error if args length
        // does not meet minArgs
        if (command?.minArgs
            && args.length < command?.minArgs) {
            const embed = new MessageEmbed()
                .setColor('DARK_BLUE')
                .setDescription(`:x: **Not Enough Arguments passed!**\nDo \`${prefix}help ${command.name}\` for more info.`);
            return {
                embeds: [embed],
            };
        }

        // If message author
        // has the required permissions
        // to run the command.
        if (command?.reqPerms
            && !message.member.permissions.any(command.reqPerms)) {
            return false;
        }

        return true;
    },
};
