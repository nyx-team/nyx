import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import {
  CommandOptions,
  SlashCommandOptions,
  SlashCommandSubCommandOptions,
} from '../typings';

import { Bot, UtilLog } from '../index';

const curPathJoin = (...paths: string[]) => join(__dirname, ...paths);

/**
 * Loads in the slash commands
 *
 * @param {Bot} bot
 */
export function loadCommands(bot: Bot): void {
  const commandFiles = readdirSync(curPathJoin('..', 'bot', 'commands')).filter(
    (file) => file.endsWith('.ts'),
  );

  commandFiles.forEach(async (file) => {
    const command = (await import(curPathJoin('..', 'bot', 'commands', file)))
      .default as SlashCommandOptions;

    if (command?.subcommands) {
      loadSubCommand(
        bot,
        curPathJoin(
          '..',
          'bot',
          'commands',
          'subcommands',
          `${file.replace('.ts', '')}`,
        ),
      );
    }

    bot.commands.set(command.name, command);
  });

  UtilLog.INFO('Loaded Slash Commands');
}

/**
 * Load prefixed commands
 *
 * @param {Bot} bot
 */
export function loadLegacyCommands(bot: Bot): void {
  const loadLegacyCommandCategories = readdirSync(
    curPathJoin('..', 'bot', 'legacy_commands'),
  ).filter((category) => !category.endsWith('.ts'));

  loadLegacyCommandCategories.forEach(async (category) => {
    const commands = readdirSync(
      curPathJoin('..', 'bot', 'legacy_commands', category),
    ).filter((file) => file.endsWith('.ts'));

    commands.forEach(async (file) => {
      const command = (
        await import(
          curPathJoin('..', 'bot', 'legacy_commands', category, file)
        )
      ).default as CommandOptions;

      bot.legacyCommands.set(command.name, command);
      bot.cooldowns.set(command.name, new Collection());
    });
  });

  UtilLog.INFO('Loaded Legacy Commands');
}

export function loadEvents(bot: Bot): void {
  const eventFiles = readdirSync(curPathJoin('..', 'bot', 'events')).filter(
    (file) => file.endsWith('.ts'),
  );

  eventFiles.forEach(async (file) => {
    const event = (await import(curPathJoin('..', 'bot', 'events', file)))
      .default;

    if (event?.once === true) {
      bot.once(event.name, (...args) => event.execute(bot, ...args));
    }
    else {
      bot.on(event.name, (...args) => event.execute(bot, ...args));
    }
  });

  UtilLog.INFO('Loaded Events');
}

export function loadSubCommand(bot: Bot, path: string): void {
  const subCommandFiles = readdirSync(path).filter((file) =>
    file.endsWith('.ts'),
  );

  subCommandFiles.forEach(async (file) => {
    const subcommand = (await import(`${path}/${file}`))
      .default as SlashCommandSubCommandOptions;

    bot.subCommands.set(subcommand.name, subcommand);
  });
}
