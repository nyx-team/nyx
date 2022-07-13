import PrefixSchema from '../../models/PrefixSchema';
import { CommandOptions } from '../../../typings';

export default {
    name: 'prefix',
    description: 'Shows the Bot prefix, or change the Bot\'s prefix',
    author: 'loldonut',

    args: '[new_prefix]',
    minArgs: 1,
    reqPerms: ['MANAGE_GUILD'],
    async permissionError(message) {
        const res = await PrefixSchema.findById(message.guild.id);
        const currentPrefix = res?.prefix ? res.prefix : ',';

        await message.reply({
            content: `**Current prefix is:** \`${currentPrefix}\``,
        });
    },
    async customArgError(message) {
        await this.permissionError(message);
    },

    category: 'Other',

    async execute(message, args) {
        const prefix = args[0];

        if (prefix.length > 10) {
            await message.reply({
                content: ':x: A prefix must be less than 10 characters!',
            });
            return;
        }

        try {
            // if the user is trying to convert it to default
            // then delete the current prefix
            if (prefix === ',') {
                await PrefixSchema.findOneAndDelete({
                    _id: message.guild.id,
                });

                await message.reply({
                    content: ':white_check_mark: Changed the prefix to default (`,`)',
                });
                return;
            }

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
        }
        catch (err) {
            console.error(err);
            await message.reply({
                content: ':x: An error occured while trying to register the new prefix.',
            });
        }
    },
} as CommandOptions;