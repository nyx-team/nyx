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
            await interaction.reply({
                content: 'An error occured while trying to execute the command.',
                ephemeral: true,
            });
            console.error(err);
        }
    }
} as EventOptions;