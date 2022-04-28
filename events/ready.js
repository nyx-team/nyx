const { loadCommands, loadLegacyCommands } = require("../Util");

module.exports = {
    name: "ready",
    once: true,

    async execute(client) {
        loadCommands(client);
        loadLegacyCommands(client);

        console.log("Bot is ready!");
    },
};
