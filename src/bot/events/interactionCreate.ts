import { Constants, DiscordAPIError } from 'discord.js';
import { EventOptions } from '../../typings';

export default {
    name: 'interactionCreate',

    async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const { commandName, options } = interaction;

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(interaction, options);
        } catch (err) {
            console.error(err);
            if (err === DiscordAPIError && err.code === Constants.APIErrors.UNKNOWN_INTERACTION) return;

            await interaction.reply({
                content: 'An error occured while trying to run the command.',
                ephemeral: true
            });
        }
    }
} as EventOptions;