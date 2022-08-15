import {
  ClientEvents,
  CommandInteraction,
  CommandInteractionOptionResolver,
  Message,
  PermissionsString,
  SlashCommandBuilder,
  Snowflake,
} from 'discord.js';

import { Bot } from './bot/bot';

export type Config = {
  token: string;
  mongo_uri: string;
  inviteCode: string;
  clientId: Snowflake;
  devToken?: string;
  devClientId?: Snowflake;
  defaultPrefix?: string;
};

export type CategoryOptions = 'Moderation' | 'Fun' | 'Other' | 'Config';

export interface CommandOptions {
  name: string;
  aliases?: Array<string>;
  description: string;
  author?: string;
  commit?: string;

  minArgs?: number;
  args?: string;

  reqPerms?: Array<PermissionsString>;
  botReqPerms?: Array<PermissionsString>;
  permissionError?(message: Message, args?: Array<string>): Promise<void>;

  customArgError?(message: Message, client: Bot): Promise<void>;

  cooldown?: number;
  category: CategoryOptions;
  execute(
    message: Message,
    args?: Array<string>,
    client?: Bot,
  ): Promise<void>;
}

export interface EventOptions<K extends keyof ClientEvents> {
  name: string;
  once?: boolean;

  execute(bot?: Bot, ...args: ClientEvents[K]): Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface SlashCommandOptions {
  name: string;
  data: SlashCommandBuilder;

  commandSubCommandsOnly: boolean;
  subcommands: Array<string>;

  execute?(
    interaction: CommandInteraction<'cached'>,
    options?: CommandInteractionOptionResolver,
  ): Promise<void>;
}

export interface SlashCommandSubCommandOptions {
  name: string;
  execute(
    interaction: CommandInteraction<'cached'>,
    options?: CommandInteractionOptionResolver,
  ): Promise<unknown>;
}
