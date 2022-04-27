const Util = require('../Util');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        Util.loadCommands(client);
        Util.loadLegacyCommands(client);

        console.log('Bot is ready!');
    },
};
