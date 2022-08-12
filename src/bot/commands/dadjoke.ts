import { SlashCommandBuilder } from 'discord.js';
import { request } from 'undici';

import { SlashCommandOptions } from '../../typings';

export default {
  name: 'dadjoke',
  data: new SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('Sends a random dad joke.'),

  async execute(interaction) {
    await interaction.deferReply();

    const Response = await request('https://icanhazdadjoke.com/', {
      headers: { Accept: 'text/plain' },
      method: 'GET',
    });
    const DadJoke = await Response.body.text();

    await interaction.editReply({
      // @ts-ignore
      content: DadJoke,
    });
  },
} as SlashCommandOptions;
