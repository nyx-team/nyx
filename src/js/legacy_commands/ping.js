module.exports = {
    name: 'ping',

    async execute(message, args, client) {
        await message.channel.send({
            content: `Pong! | ${client.ws.ping}ms!`,
        });
    },
};
