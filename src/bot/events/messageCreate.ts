import { Message } from 'discord.js';
import { setTimeout as sleep } from 'node:timers/promises';

import PrefixSchema from '../models/PrefixSchema';
import validateCommand from '../../utils/validateCommand';
import loadConfig from '../../utils/loadConfig';
import type { Config, CommandOptions, EventOptions } from '../../typings';
import DisabledCommandsSchema from '../models/DisabledCommandsSchema';

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default {
  name: 'messageCreate',
  async execute(client, message: Message<true>) {
    if (!message.inGuild()) return;
    if (message.author.bot) return;
    if (!message.channel.permissionsFor(message.client.user).has('SendMessages')) return;

    const config = loadConfig() as Config;

    // @ts-ignore
    const results = await PrefixSchema.findById(message.guild.id);
    const prefix = results ? results.prefix : config.defaultPrefix || ',';

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    const commands =
      client.legacyCommands.get(command) ??
      client.legacyCommands.find((cmds: CommandOptions) => cmds.aliases && cmds.aliases.includes(command));
    if (!commands) return;

    // @ts-ignore
    // eslint-disable-next-line
    const disabledCommands = (await DisabledCommandsSchema.findById(message.guild.id))
      ?.disabledCommands! as Array<string>;
    if (disabledCommands && disabledCommands.includes(command)) return;

    const isCommandValid = await validateCommand(message, commands, args, prefix);
    if (isCommandValid && isCommandValid !== true) {
      message.reply(isCommandValid);
      return;
    }
    if (!isCommandValid) return;

    const cooldown = message.client.cooldowns.get(commands.name);

    if (cooldown?.has(message.author.id)) {
      const cooldownTime = cooldown.get(message.author.id);
      const currentTime = Date.now();

      if (cooldownTime < currentTime) {
        const cooldownMessage = await message.reply({
          content: '**You are on cooldown!**',
        });
        await sleep(5000);
        await cooldownMessage.delete();

        return;
      }
    }

    cooldown.set(message.author.id, Date.now());

    // Remove the cooldown after the specified cooldown
    // If there's no cooldown specified, the default will be 3 seconds.
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 1000 * (commands?.cooldown || 3));

    try {
      await commands.execute(message, args, client);
    }
    catch (err) {
      console.error(err);
      await message.channel.send({
        content: ':x: The Command Failed!',
      });
    }
  },
} as EventOptions<'messageCreate'>;
