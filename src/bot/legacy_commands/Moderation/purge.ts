import { Message } from 'discord.js';
import { CommandOptions } from '../../../typings';

export default {
    name: 'purge',
    aliases: ['clear'],
    description: 'Deletes a certain amount of message provided by the user.',
    author: 'loldonut',

    args: '<purge count>',
    minArgs: 1,
    reqPerms: ['MANAGE_MESSAGES'],
    botReqPerms: ['MANAGE_MESSAGES'],

    category: 'Moderation',

    async execute(message: Message, args: Array<string>) {
        /* eslint-disable radix */
        const amount = parseInt(args[0]);

        /* eslint-disable no-promise-executor-return */
        const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

        await message.delete();
        // @ts-ignore
        const { size } = await message.channel.bulkDelete(amount, true);

        const purgedMessage = await message.channel.send({
            content: `**Purged ${size} messages(s)**`,
        });
        await sleep();
        await purgedMessage.delete();
    },
} as CommandOptions;