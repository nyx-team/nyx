Changelog
### Features

- Add a discord timestamp for dates

- Add a function to convert to discord timestamps


### Other

- Add `Logger` to replace `Util#Log`


- Update `ts-node`


- Add npm script `start:heroku` for hosting the Bot in heroku


- Fix Procfile `worker`


- Add `highlow` slash command


- Handle unkown interactions


- Use discord.js constants for api error unknown interaction


- Listen for `warn` and `error`


- Change `correctNum` max number to `200`

- Send what the member chose

- Change minimum number of `baseNum` to 50

- Add `flip` slash command


- Add `dice` slash command


- Add `lint` npm script


- Add `lint` workflow


- Don't install gloablly in lint workflow


- Run an npm script for linting instead


- Fix lint typo in lint workflow


- Add `rps` slash command


- Fix purge exploit


- Update rps.ts

- Add `avatar` prefixed command


- Send prefix command failed message by object and not string


- Make it possible to have subcommands


- Add `role` slash commands


- Don't throw an Error when no subcommand was found


- Only receive interactions if it's both from a guild and cached


- Use `.followUp` on some cases

- Update eslintrc


- Add more eslint rules and follow them


- Use spaces in eslintrc


- Remove `ignorePatterns` in eslintrc


- Move `models` folder to `bot`


- Add `enable` and `disable` prefix commands


- Make sure the member can't disable `disbale` and `enable`


- Only make `enable` protected from `disable` command


- Fix `disable` prefix command undefined properties error when checking in lists


- Update to discord.js v14 (#4)

* Add `engines` and node version in package.json

* Update djs version to v14 and all outdated packages

* Use the new enums in `bot.ts`

* Update all commands that uses embeds to the new `EmbedBuilder`

* Use API v10

* Update `validateCommand` permissions check

* Specifically use `4.1.2` version of `chalk`

* Update `interactionCreate` event listener to v14

* Update all slash commands to v14

* Actually update all slash commands to v14

* Import from `discord.js` in `deployCommands.ts`

* Use `PermissionsString` in `typings.ts`

* Update prefixed commands permissions to PascalCase

* Update `prefix` prefixed command permissions to PascalCasing

- Add command categories in command `help`


- Only accept messages from non-bot members


- Fix type error in `messageCreate.ts`


- Update `messageCreate.ts` permission check to pascal casing


- Remove log in `messageCreate.ts`


- Fix prefixes not working due to not having `MessageContent` Intent


- Set status to `idle`


- Check if it's a chat input command


- Add a generic type for `EventOptions`


- Fix `Util` no generic type for `EventOptions`


- Make `Util.ts` a collectio of util functions instead of a Class


- Fix can't load subcommands


- Add (prefixed) commands cooldown feature


- Remove `client` param in `validateCommand`


- Add 8ball prefixed command


- Add `totimestamp` prefixed command specifically for discord timestamps


- Round the calcuted unix time


- Add commitlint and husky

- Update commitlint config and package.json

- Add contribution guidelines

- Move contributing guideliens to `.github` folder

- Remove `style` commit type

- Update scopes to be usable for new features

- Merge branch 'main' of github.com:nyx-team/nyx



### Refactor

- Update the command to use `toTimestamp` function


### Other

- Add basic files and typings


- Add README


- Add ping slash command


- Add `loadEvents` static function in  `Util` to load events folder


- Add `loadLegacyCommands` static function on `Util` to load prefixed commands


- Port `ping` legacy command to TS


- Add event `messageCreate`


- Add models folder and `PrefixSchema` model


- Add mongodb connection


- Update to discord.js v13.8.1


- Move everything except index file to an `src` folder


- Only run dotenv `config` function when necessary


- Remove unecessary return in `run`


- Add index file in src folder


- Simplify imports in `run`


- Update README


- Add a License


- Exit on error in `run`


- Add `.gitattributes` file to prevent git to convert LF to CRLF on Windows


- Add option to log in as dev bot


- Add \`botReqPerms\` in \`CommandOptions\` for required permissions the bot needs


- Add `purge` legacy command


- Add `Constants` file


- Use `PermissionsReadable` to convert `botReqPerms` to a readable one


- Add `dev` script in `package.json`


- Add `kick` legacy command


- Make `aliases` optional in `CommandOptions`


- Add `snipe` legacy command


- Make `snipe` command accessible for everyone


- Add `userinfo` command


- Use `nodemon` for `dev` script


- Add `deployCommands` function and `deploy` run option


- Make `deployCommands` `clientId` customizable


- Add `purge` slash command


- Fix `deployCommands` not deploying properly


- Add listener to `interactionCreate` in `events`


- Add `ban` legacy command


- Add `unban` legacy command


- Add `help` legacy command


- Add `prefix` legacy command


- Add heroku config file and add `start` script


- Add `ts-node` in package dependencies


- Add configuration tutorial in README


- Move `dotenv` to `dependencies`


- Make `dotenv` an optional package (again?)


- Heroku stuff


- Heroku stuff #2


- Ignore `dist` folder in ESLint and TSC


- Update `Procfile` and add `build` npm script


- Skip lib check (TSC)


- Update `Procfile`


- Revert to `npm start` in Procfile


<!-- generated by git-cliff -->