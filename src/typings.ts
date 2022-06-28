import { SlashCommandBuilder } from '@discordjs/builders';
import {
    Client,
    CommandInteraction,
    CommandInteractionOptionResolver,
    Message,
    PermissionString
} from 'discord.js';

export type Config = {
    token: string;
    mongo_uri: string;
    devToken?: string;
};

export type CategoryOptions = 'Moderation' | 'Fun' | 'Other';

export interface CommandOptions {
    name: string;
    aliases?: Array<string>;
    description: string;
    author?: string;
    commit?: string;

    minArgs?: number;
    args?: string;

    reqPerms?: Array<PermissionString>;
    botReqPerms?: Array<PermissionString>;
    permissionError?(message: Message, args?: Array<string>): Promise<void>;

    customArgError?(message: Message, client: Client): Promise<void>;

    category: CategoryOptions;
    execute(
        message: Message,
        args?: Array<string>,
        client?: Client<true>
    ): Promise<void>;
}

export interface EventOptions {
    name: string;
    once?: boolean;

    execute(client?: Client, ...args: any[]): Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface SlashCommandOptions {
    name: string;
    data: SlashCommandBuilder;
    execute(
        interaction: CommandInteraction,
        options?: CommandInteractionOptionResolver
    ): Promise<void>;
}
