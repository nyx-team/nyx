import { SlashCommandBuilder } from '@discordjs/builders';
import {
  Client,
  ClientEvents,
  CommandInteraction,
  CommandInteractionOptionResolver,
  Message,
  PermissionsString,
  Snowflake,
} from 'discord.js';

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

  customArgError?(message: Message, client: Client): Promise<void>;

  cooldown?: number;
  category: CategoryOptions;
  execute(
    message: Message,
    args?: Array<string>,
    client?: Client<true>,
  ): Promise<void>;
}

export interface EventOptions<K extends keyof ClientEvents> {
  name: string;
  once?: boolean;

  execute(client?: Client, ...args: ClientEvents[K]): Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface SlashCommandOptions {
  name: string;
  data: SlashCommandBuilder;

  commandSubCommandsOnly: boolean;
  subcommands: Array<string>;

  execute?(
    interaction: CommandInteraction,
    options?: CommandInteractionOptionResolver,
  ): Promise<void>;
}

export interface SlashCommandSubCommandOptions {
  name: string;
  execute(
    interaction: CommandInteraction,
    options?: CommandInteractionOptionResolver,
  ): Promise<unknown>;
}
