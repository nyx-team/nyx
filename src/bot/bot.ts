import {
    ActivityType,
    Client,
    Collection,
    GatewayIntentBits,
    Message,
    Partials,
} from 'discord.js';

import type {
    SlashCommandOptions,
    CommandOptions,
    SlashCommandSubCommandOptions,
} from '../typings';

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Channel],
    allowedMentions: {
        parse: ['users'],
        repliedUser: false,
    },
    presence: {
        activities: [{
            name: 'dark theme moment',
            type: ActivityType.Playing,
        }],
    },
}) as Client;

// Declare the Collections as a type
// for Client
declare module 'discord.js' {
    // eslint-disable-next-line no-shadow
    export interface Client {
        commands: Collection<string, SlashCommandOptions>;
        subCommands: Collection<string, SlashCommandSubCommandOptions>;
        legacyCommands: Collection<string, CommandOptions>;
        snipedMessages: Collection<string, Message>;
    }
}

client.commands = new Collection<string, SlashCommandOptions>();
client.subCommands = new Collection<string, SlashCommandSubCommandOptions>();
client.legacyCommands = new Collection<string, CommandOptions>();
client.snipedMessages = new Collection<string, Message>();

client.on('nyxDebug', (m) => console.log(m))
    .on('warn', console.log)
    .on('error', console.log);
