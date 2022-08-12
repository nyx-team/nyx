import { EmbedBuilder } from 'discord.js';

import { CommandOptions } from '../../../typings';
import DisabledCommandsSchema from '../../models/DisabledCommandsSchema';

export default {
  name: 'disable',
  description: 'Disables PREFIXED commands.',

  minArgs: 1,
  args: '<..."commands_to_disable"|list>',
  reqPerms: ['ManageGuild'],

  category: 'Config',
  async execute(message, args) {
    // eslint-disable-next-line
    const disabledCommandsList = (
      // @ts-ignore
      await DisabledCommandsSchema.findById(message.guild.id)
    )?.disabledCommands! as Array<string>;

    if (args[0] === 'list') {
      const embed = new EmbedBuilder()
        .setTitle(':information_source: List of disabled commands')
        .setDescription(
          `
\`\`\`
${disabledCommandsList.join(', ')}
\`\`\`
                `,
        )
        .setColor('Blurple');

      await message.reply({
        embeds: [embed],
      });
      return;
    }

    const quotesRegex = /".*?"/g;
    const commands = args
      .join(' ')
      .match(quotesRegex)
      .filter((v) => v !== '"enable"');

    if (!commands) {
      await message.reply({
        content: `
**No commands specified!**
Format should be like this:
\`\`\`
disable "purge" "avatar"
\`\`\`
And so on...
                `,
      });
      return;
    }

    const disabledCommands = [];
    for await (let command of commands) {
      command = command.replaceAll('"', '');
      const actualCommand = message.client.legacyCommands.find(
        (v) => v.name === command,
      );

      if (!actualCommand) continue;
      if (disabledCommandsList?.includes?.(actualCommand.name)) continue;

      // @ts-ignore
      await DisabledCommandsSchema.findOneAndUpdate(
        {
          _id: message.guild.id,
        },
        {
          _id: message.guild.id,
          $push: {
            // @ts-ignore
            disabledCommands: actualCommand.name,
          },
        },
        { upsert: true },
      );

      disabledCommands.push(`\`${actualCommand.name}\``);
    }

    await message.reply({
      content: `:white_check_mark: **Disabled commands:** ${disabledCommands.join(
        ', ',
      )}`,
    });
  },
} as CommandOptions;
