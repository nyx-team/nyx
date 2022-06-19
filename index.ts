import {
    Collection,
    Client,
    Intents,
    Message
} from 'discord.js';

import type {
    SlashCommandOptions,
    CommandOptions,
    Config
} from './typings/index';
import loadConfig from './utils/loadConfig';
import Util from './utils/Util';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    partials: ['CHANNEL'],
    allowedMentions: {
        parse: ['users'],
        repliedUser: false
    },
    presence: {
        activities: [{
            name: 'dark theme moment',
            type: 'PLAYING'
        }]
    }
}) as Client;

// Declare the Collections as a type
// for Client
declare module 'discord.js' {
    export interface Client {
        commands: Collection<string, SlashCommandOptions>;
        legacyCommands: Collection<string, CommandOptions>;
        snipedMessages: Collection<string, Message>;
    }
}

client.commands = new Collection<string, SlashCommandOptions>();
client.legacyCommands = new Collection<string, CommandOptions>();
client.snipedMessages = new Collection<string, Message>();

const config = loadConfig() as Config;

Util.loadEvents(client);

client.on('nyxDebug', (m) => console.log(m));
client.login(config.token);
