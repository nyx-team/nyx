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
};

export type CategoryOptions = 'Moderation' | 'Fun' | 'Other';

export interface CommandOptions {
    name: string;
    description: string;
    author?: string;
    commit?: string;

    minArgs?: number;
    args?: string;
    reqPerms?: Array<PermissionString>;
    permissionError?(message: Message): Promise<void>;
    customArgError?(message: Message): Promise<void>;

    category: CategoryOptions;
    execute(
        message: Message,
        args?: Array<string>,
        client?: Client<true>
    ): Promise<void>;
}

export interface SlashCommandOptions {
    name: string;
    data: SlashCommandBuilder;
    execute(
        interaction: CommandInteraction,
        options?: CommandInteractionOptionResolver
    ): Promise<void>;
}
