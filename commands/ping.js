const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'ping',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Sends the ping of the Bot.'),

    async execute(interaction) {
        await interaction.reply({
            content: `Pong! | ${interaction.client.ws.ping}ms!`,
        });
    },
};
