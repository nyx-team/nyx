// For autocompletion/IntelliSense
const { Client, Message } = require('discord.js');

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

        try {
            await commands.execute(message, args, client);
        } catch (err) {
            console.error(err);
            await message.channel.send(':x: The Command Failed!');
        }
    },
};
