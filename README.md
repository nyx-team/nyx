# Nyx

**Nyx is a Multi-purpose, open-source Discord Bot, made in TypeScript.**

## Configuration

**Configuration file is Mandatory for the Bot to work**

Config file requires these data to at least run the Bot:

`token`, `mongo_uri`, `clientId`

### Optional Config

##### `devToken`
Development version of the bot, for testing purposes.

##### `devClientId`
ID of the Development version of the Bot, required to be able to deploy slash commands in your development version of the Bot

##### `defaultPrefix`
The Default prefix for the Bot, if none, then the default will be `,`

### JSON Config

All of the possible configuration -

```json
{
    "token": "TOKEN",
    "mongo_uri": "MONGO_URI",
    "clientId": "CLIENT_ID",
    "devToken": "DEV_BOT_TOKEN",
    "devClientId": "DEV_BOT_ID",
    "defaultPrefix": "DEFAULT_PREFIX"
}
```

### Using `dotenv` and `.env`

```env
token="TOKEN"
devToken="DEV_BOT_TOKEN"
mongo_uri="MONGO_URI"
clientId="CLIENT_ID"
devClientId="DEV_BOT_ID"
defaultPrefix="DEFAULT_PREFIX"
```

## Links

- [JavaScript Branch](https://github.com/nyx-team/nyx/tree/main)

[Invite the Bot here](https://discord.com/oauth2/authorize?client_id=960533661109878805&scope=bot%20applications.commands&permissions=545394261246)
