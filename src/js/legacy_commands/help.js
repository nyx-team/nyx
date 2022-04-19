const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Helps with commands, what else.',
    author: 'loldonut',

    minArgs: 1,
    args: '<command name>',

    /**
     * @param {Message} message
     * @param {string[]} args
     * @param {Client} client
     */
    async execute(message, args, client) {
        /*
        if (!args.length) return message.reply({
            content: `**Not enough arguments passed!**\nArgs:\n\`\`\`\nhelp ${this.args}\n\`\`\``,
        });*/

        const commandName = args[0];
        const command = client.legacyCommands.get(commandName);

        if (!command) return message.reply({
            content: `**No command called: ${commandName}**`,
        });

        const { name, description } = command;

        const embed = new MessageEmbed()
            .setAuthor({
                name: `Command: ${name}`,
                iconURL: client.user.avatarURL(),
            })
            .setTimestamp()
            .setColor(0x6666ff)
            .addField('Description', description);

        if (command.args) embed.addField('Args', command.args);
        if (command.author) embed.addField('Command Author', `This command is made by: \`${command.author}\``);

        await message.reply({
            embeds: [embed],
        });
    },
};
