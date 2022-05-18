module.exports = {
    name: 'ping',
    description: 'Shows the ping of the Bot',
    author: 'loldonut',

    category: 'Others',

    async execute(message, client) {
        await message.channel.send({
            content: `Pong! | ${message.client.ws.ping}ms!`,
        });
    },
};
