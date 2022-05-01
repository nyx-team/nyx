const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Helps with commands, what else.',
    author: 'loldonut',

    minArgs: 1,
    args: '<command name>',
    category: 'Help',

    /**
   * @param {Message} message
   * @param {string[]} args
   * @param {Client} client
   */
    async execute(message, args, client) {
        const commandName = args[0];
        const command = client.legacyCommands.get(commandName);

        if (!command)
            return message.reply({
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

        if (command.aliases) embed.addField('Aliases', command.aliases.join(', '));
        if (command.args) embed.addField('Args', `\`${command.args}\``);
        if (command.category) embed.addField('Category', command.category);
        if (command.author)
            embed.addField(
                'Command Author',
                `This command is made by: \`${command.author}\``
            );

        await message.reply({
            embeds: [embed],
        });
    },
};
