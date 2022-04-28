const { Client, Collection, Intents } = require("discord.js");

const { readFileSync } = require("fs");

const { join } = require("path");

const { loadEvents } = require("./Util");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ["CHANNEL"],
    allowedMentions: {
        parse: ["users"],
        repliedUser: false,
    },
    presence: {
        activities: [
            {
                name: "dark theme moment",
                type: "PLAYING",
            },
        ],
    },
});

// #region Load Config
const configJSON = readFileSync(join(__dirname, ".", "config.json"), {
    encoding: "utf8",
});
const config = JSON.parse(configJSON);
// #endregion

try {
    require("dotenv").config();
    /* eslint-disable no-empty */
} catch {}

const token = config.token ?? process.env.token;

// Collection(s)
client.commands = new Collection();
client.legacyCommands = new Collection();

loadEvents(client);
client.on("nyxDebug", (message) => console.log(message));

client.login(token);
