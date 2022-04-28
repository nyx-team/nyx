const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "purge",
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purges messages / Bulk deletes messages")
        .addNumberOption((option) =>
            option
                .setName("amount")
                .setDescription("Amount of messages you want to be deleted")
                .setRequired(true)
        ),

    /**
   * @param {CommandInteraction} interaction
   */
    async execute(interaction, options) {
        const amount = options.getNumber("amount");

        const { size } = await interaction.channel.bulkDelete(amount, true);

        const purgedMessage = await interaction.reply({
            content: `**Purged ${size} messages(s)!**`,
        });

        /* eslint-disable no-promise-executor-return */
        const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
        await sleep();

        await interaction.deleteReply();
    },
};
