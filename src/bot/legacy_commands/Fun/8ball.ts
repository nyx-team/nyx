import { CommandOptions } from '../../../typings';

export default {
  name: '8ball',
  description: 'An 8ball command, what else?',
  author: 'loldonut',

  args: '<question>',

  category: 'Fun',
  async execute(message, args) {
    if (!args[0]) return;

    const responses = ['Yes', 'No'];
    const n = Math.floor(Math.random() * responses.length);
    const BotChose = responses[n];

    await message.reply({ content: BotChose });
  },
} as CommandOptions;
