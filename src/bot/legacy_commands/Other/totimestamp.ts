import { CommandOptions } from '../../../typings';

export default {
    name: 'to-timestamp',
    aliases: ['to-unix-timestamp', 'to-discord-timestamp'],
    description: 'Converts a JavaScript Date to a Unix Timestamp.\nIntented to be used to easily make discord timestamps.',
    author: 'loldonut',

    minArgs: 1,
    args: '<date>',

    category: 'Other',
    async execute(message, args) {
        const date = args.join(' ');
        const unixTime = Date.parse(date);

        if (isNaN(unixTime) || unixTime <= 0) {
            await message.reply({
                content: ':x: | **Error:** Invalid Date.',
            });
            return;
        }

        await message.reply({
            content: `To Timestamp: \`${unixTime / 1000}\``,
        });
    },
} as CommandOptions;