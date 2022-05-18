const {
    Message,
    MessageEmbed,
} = require('discord.js');

const PrefixSchema = require('../../models/PrefixSchema');

module.exports = {
    name: 'prefix',
    description: 'Shows the Bot prefix, or change the Bot\'s prefix',
    author: 'loldonut',

    args: '[new_prefix]',
    minArgs: 1,
    reqPerms: ['MANAGE_GUILD'],

    category: 'Other',

    /**
     * @param {Message} message
     * @param {string[]} args
     */
    async execute(message, args) {
        const prefix = args[0];

        if (prefix.length > 10) {
            return message.reply({
                content: `:x: A prefix must be less than 10 characters!`,
            });
        }

        try {
            await PrefixSchema.findOneAndUpdate({
                _id: message.guild.id,
            }, {
                _id: message.guild.id,
                prefix,
                dateChanged: new Date(),
            }, { upsert: true });

            await message.reply({
                content: `:white_check_mark: Changed prefix to: \`${prefix}\``,
            });
        } catch (err) {
            console.error(err);
            await message.reply({
                content: ':x: An error occured while trying to register the new prefix.',
            });
        }
    },
};
