import {
  ActivityType,
  Client,
  Collection,
  GatewayIntentBits,
  Message,
  PartialMessage,
  Partials,
  Snowflake,
} from 'discord.js';

import type {
  SlashCommandOptions,
  CommandOptions,
  SlashCommandSubCommandOptions,
} from '../typings';


export class Bot extends Client {
  commands: Collection<string, SlashCommandOptions>;
  subCommands: Collection<string, SlashCommandSubCommandOptions>;
  legacyCommands: Collection<string, CommandOptions>;
  snipedMessages: Collection<string, Message | PartialMessage>;
  cooldowns: Collection<string, Collection<Snowflake, number>>;

  public constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel],
      allowedMentions: {
        parse: ['users'],
        repliedUser: false,
      },
      presence: {
        activities: [
          {
            name: 'dark theme moment',
            type: ActivityType.Playing,
          },
        ],
        status: 'idle',
      },
    });

    this.commands = new Collection<string, SlashCommandOptions>();
    this.subCommands = new Collection<string, SlashCommandSubCommandOptions>();
    this.legacyCommands = new Collection<string, CommandOptions>();
    this.snipedMessages = new Collection<string, Message>();
    this.cooldowns = new Collection<string, Collection<Snowflake, number>>();

    this
      .on('nyxDebug', (m) => console.log(m))
      .on('warn', console.log)
      .on('error', console.log);
  }
}
