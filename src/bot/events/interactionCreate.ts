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
        }
    }
} as EventOptions;