# CommandOptions

This MD File is to explain `CommandOptions` for legacy/prefixed commands.

## Required Options

### `name`

- type: `string`

The name of the command

### `description`

- type: `string`

The description of the command

### `category`

- type: `string`

Categories available are:
`Fun`, `Moderation`, & `Other`

## Optional Options

### `author`

- type: `string`

The creator of the command, can be your discord name, or your actual name

### `args`

- type: `string`

Argument(s) for the Command

- Example

```js
args: '[optional_arg] <required_arg> [option_1|option_2]',
```

- `[]` - Optional
- `<>` - Required
  - `|` - Means that argument can be one of the types

### `minArgs`

- type: `number`

Minimum argument(s) needed for the commmand to run

If a user didn't give the minimum argument(s) the bot will automatically give an error. 

***Argument Error can be customized***

[**See `customArgError`**](#customArgError)

### `reqPerms`

- type: `Array<Permissions.FLAGS>`

An Array of required permission(s) for the command to run, *for the user and for the Bot*

[**See permission flags here**](https://discord.js.org/#/docs/discord.js/stable/class/Permissions?scrollTo=s-FLAGS)

### `customArgError`

- type: `function`

Overwrites the default argument error, with the custom one

**Parameters:**

- `message`: [**Message**](https://discord.js.org/#/docs/discord.js/stable/class/Message)
- `client`: [**Client**](https://discord.js.org/#/docs/discord.js/stable/class/Client)
