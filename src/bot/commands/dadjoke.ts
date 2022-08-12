import { SlashCommandBuilder } from 'discord.js';
import { request } from 'undici';

import { SlashCommandOptions } from '../../typings';

export default {
  name: 'dadjoke',
  data: new SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('Sends a random dad joke.'),

  async execute(interaction) {
    const DadJoke = (await request('https://icanhazdadjoke.com/', {
      headers: { accept: 'application/json' },
    })).body.json();

    await interaction.reply({
      // @ts-ignore
      content: DadJoke.joke,
    });
  },
} as SlashCommandOptions;