# Commands

This documentation is on how prefixed commands on Nyx should be built.

- [Prefixed Commands](#prefixed-commands)
  - [Prefixed Commands Categories](#prefixed-commands-categories)

# Prefixed Commands

Prefixed commands are Nyx commands that uses
messages with a prefix instead of an Interaction by a slash command.
(e.g. `,ping`)

Prefixed commands are stored in the [`src/bot/legacy_commands`](./src/bot/legacy_commands)
directory, which contains each categories for the commands.

##### Prefixed Commands Categories

###### All Categories Nyx currently have
- Config
  - Commands that configures something in a server
    (e.g. `,prefix`)
- Fun
- Moderation
- Other

### Prefixed Command Options

All Available Options you can have in a prefixed command.

### Required Command Options

#### `name`

- **type:** `string`

the Name of the Command

#### `description`

- **type:** `string`

the Description of the Command

#### `category`

- **type:** `CategoryOptions`
 
- `CategoryOptions` type:
  - `Config`
  - `Fun`
  - `Moderation`
  - `Other`

#### Optional Command Options

#### `aliases`

- **type:** `Array<string>`

Alias(es) of the Command

#### `author`

- **type:** `string`

the Author of the command. (can be full name, or GitHub username)

#### `args`

- **type:** `string`

Arguments of the Command, this should be similar to
CLI where:
- `[]` - means optional
- `<>` - means required

**Example:**

```ts
args: '<required_arg> [optional_arg] [optional_arg_2]'
```

Argument names should not have spaces in it, use underscore / snake casing (`_`) instead

#### `minArgs`

- **type:** `number`

Minimum argument(s) *length* required for the command to run

#### `reqPerms`

- **type:** `PermissionsString`

Required permissions for the *user* to run the command.
This however does not check if the *bot* has the permission.
See [`botReqPerms`](#botReqPerms)

#### `botReqPerms`

- **type:** `PermissionsString`

Required permissions for the *Bot* to run.
