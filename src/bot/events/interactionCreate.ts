import {
    ChatInputCommandInteraction,
    DiscordAPIError,
    InteractionType,
    RESTJSONErrorCodes,
} from 'discord.js';
import { EventOptions } from '../../typings';

export default {
    name: 'interactionCreate',

    async execute(client, interaction: ChatInputCommandInteraction) {
        if (!interaction.inCachedGuild()) return;
        if (interaction.type !== InteractionType.ApplicationCommand) return;
        const { commandName, options } = interaction;

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            if (options.getSubcommand(false)) {
                const subCommandName = options.getSubcommand();
                const subCommand = client.subCommands.get(subCommandName);

                // @ts-ignore
                await subCommand.execute(interaction, options);

                if (command?.commandSubCommandsOnly) return;
            }

            // @ts-ignore
            await command.execute(interaction, options);
        }
        catch (err) {
            console.error(err);
            if (err === DiscordAPIError && err.code === RESTJSONErrorCodes.UnknownInteraction) return;

            await interaction.reply({
                content: 'An error occured while trying to run the command.',
                ephemeral: true,
            });
        }
    },
} as EventOptions;
