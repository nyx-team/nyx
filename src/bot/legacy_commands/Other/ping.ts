import type { CommandOptions } from '../../../typings';

export default {
    name: 'ping',
    description: 'Shows the ping of the Bot',
    author: 'loldonut',

    category: 'Other',

    async execute(message) {
        await message.channel.send({
            content: `Pong! | ${message.client.ws.ping}ms`,
        });
    }
} as CommandOptions;
