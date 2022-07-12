import { SlashCommandBuilder } from '@discordjs/builders';
import {
    ButtonInteraction,
    CommandInteractionOptionResolver,
    MessageActionRow,
    MessageButton,
} from 'discord.js';

import { SlashCommandOptions } from '../../typings';

const RPS_BEATS = {
    rock: {
        name: 'Rock',
        beats: 'scissors',
    },
    paper: {
        name: 'Paper',
        beats: 'rock',
    },
    scissors: {
        name: 'Scissors',
        beats: 'paper',
    },
};

type validSelections = 'rock' | 'paper' | 'scissors';
const isWinner = (s1: validSelections, s2: validSelections): boolean => RPS_BEATS[s1].beats === s2;

export default {
    name: 'rps',
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play rock paper scissors')
        .addUserOption((option) => option
            .setName('enemy')
            .setDescription('the Player to battle with')
            .setRequired(true),
        ),

    async execute(interaction, options: CommandInteractionOptionResolver) {
        const enemy = options.getUser('enemy');

        let authorSelection: validSelections;
        let enemySelection: validSelections;

        // #region Buttons and Row
        const rock = new MessageButton()
            .setCustomId('rock')
            .setLabel('✊')
            .setStyle('SUCCESS');

        const paper = new MessageButton()
            .setCustomId('paper')
            .setLabel('✋')
            .setStyle('SUCCESS');

        const scissors = new MessageButton()
            .setCustomId('scissors')
            .setLabel('✌️')
            .setStyle('SUCCESS');

        const row = new MessageActionRow()
            .addComponents([rock, paper, scissors]);
        // #endregion

        // #region Author Selection
        const authorFilter = (i: ButtonInteraction): boolean => ['rock', 'paper', 'scissors'].includes(i.customId) && i.user.id === interaction.user.id;
        const authorCollector = interaction.channel.createMessageComponentCollector({
            // @ts-ignore
            filter: authorFilter,
            time: 1000 * 10,
        });

        await interaction.reply({
            content: `${interaction.member} has started an RPS battle with ${enemy}!\n${interaction.member} it's time for you to pick!`,
            components: [row],
        });

        authorCollector.on('collect', async (i) => {
            authorSelection = i.customId as validSelections;

            await i.deferReply();
            await i.followUp({
                content: `**${i.user.tag}** is done choosing!`,
                components: [],
            });

            authorCollector.stop();
        });
        // #endregion

        // #region Enemy Selection
        authorCollector.on('end', async () => {
            if (!authorSelection) {
                await interaction.followUp({
                    content: `**${interaction.user.username}** failed to choose! (RPS Command Cancelled.)`,
                });
                return;
            }

            const enemyPickMSG = await interaction.channel.send({
                content: `${enemy} it's time for you to pick!`,
                components: [row],
            });

            const enemyFilter = (i: ButtonInteraction): boolean => ['rock', 'paper', 'scissors'].includes(i.customId) && i.user.id === enemy.id;
            const enemyCollector = interaction.channel.createMessageComponentCollector({
                // @ts-ignore
                filter: enemyFilter,
                time: 1000 * 20,
            });

            enemyCollector.on('collect', async (i) => {
                enemySelection = i.customId as validSelections;

                await enemyPickMSG.edit({
                    content: `${enemy} is now done picking!`,
                    components: [],
                });

                enemyCollector.stop();
            });
            // #endregion

            // #region See who is the winner
            enemyCollector.on('end', async () => {
                if (!enemySelection) {
                    await interaction.followUp({
                        content: `**${enemy.username}** failed to choose! (RPS Command Cancelled.)`,
                    });
                    return;
                }

                const isAuthorWinner = isWinner(authorSelection, enemySelection);
                const isEnemyWinner = isWinner(enemySelection, authorSelection);
                const isBothWinner = isAuthorWinner && isEnemyWinner;

                const results = `
                **${interaction.user.tag}** picked **${RPS_BEATS[authorSelection].name}**
**${enemy.tag}** picked **${RPS_BEATS[enemySelection].name}**\n\n**Results -**`;

                if (authorSelection === enemySelection || isBothWinner) {
                    await interaction.followUp({
                        content: `${results} ***Tie***`,
                    });
                }

                if (isAuthorWinner) {
                    await interaction.followUp({
                        content: `${results} ${interaction.user} ***wins!***`,
                    });
                }

                if (isEnemyWinner) {
                    await interaction.followUp({
                        content: `${results} ${enemy} ***wins!***`,
                    });
                }
            });
        });
        // #endregion
    },
} as SlashCommandOptions;
