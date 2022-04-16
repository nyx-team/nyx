const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'mdn',

    /* eslint-disable indent */
    data: new SlashCommandBuilder()
    .setName('mdn')
    .setDescription('Search for MDN JS Docs')
    .addStringOption((options) => options.setName('query').setDescription('Search JS Stuff through MDN').setRequired(true)),

    /**
     * Credits to 'WornOffKeys'
     * For making a tutorial on how
     * to search for documentation of mdn.
     * Link to his tutorial:
     * https://youtu.be/fBYAhrkl-fM
     *
     * @param {CommandInteraction} interaction
     * @param {CommandInteractionOptionResolver} options
     */
    async execute(interaction, options) {
        const base = 'https://developer.mozilla.org';

        const query = options.getString('query');

        const uri = `${base}/api/v1/search?q=${encodeURIComponent(query)}&locale=en-US`;

        let truncated = false;
        /* eslint-disable prefer-destructuring */
        const documents = (await axios.get(uri)).data.documents;

        if (!documents.length) return interaction.reply({
            content: 'No results was found!',
            ephemeral: true,
        });
        if (documents.length > 3) {
            documents.length = 3;
            truncated = true;
        }

        const embed = new MessageEmbed()
        .setAuthor({
            name: 'MDN Docs',
        })
        .setColor('BLUE')
        .setTimestamp();
        /* eslint-disable no-restricted-syntax */
        for (let { title, summary, mdn_url } of documents) {
            summary = summary.replace(/(\r\n|\n|\r)/gm);

            embed.addField(title, `${summary}\n**[Link](${base}${mdn_url})**`);
        }

        if (truncated) {
            embed.addField('Other Results', `Got too many results! [Click here to view all results](${uri})`);
        }

        await interaction.reply({
            embeds: [embed],
        });
    },
};
