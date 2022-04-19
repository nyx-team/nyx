module.exports = {
    name: 'ping',
    description: 'Shows the ping of the Bot',
    author: 'loldonut',

    category: 'Others',

    async execute(message, args, client) {
        await message.channel.send({
            content: `Pong! | ${client.ws.ping}ms!`,
        });
    },
};
