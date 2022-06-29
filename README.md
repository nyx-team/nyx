# Nyx

**Nyx is a Multi-purpose, open-source Discord Bot, made in TypeScript.**

## Configuration

**Configuration file is Mandatory for the Bot to work**

Config file requires these data to at least run the Bot:

`token`, `mongo_uri`, `clientId`

### Optional Config

`devToken` - Development version of the bot, for testing purposes.

`devClientId` - ID of the Development version of the Bot, required to be able to deploy slash commands in your development version of the Bot
### JSON Config

All of the possible configuration -

```json
{
    "token": "TOKEN",
    "mongo_uri": "MONGO_URI",
    "clientId": "CLIENT_ID",
    "devToken": "DEV_BOT_TOKEN",
    "devClientId": "DEV_BOT_ID"
}
```

### Using `dotenv` and `.env`

```env
token="TOKEN"
devToken="MONGO_URI"
mongo_uri="CLIENT_ID"
clientId="DEV_BOT_TOKEN"
devClientId="DEV_BOT_ID"
```

## Links

- [JavaScript Branch](https://github.com/nyx-team/nyx/tree/main)

[Invite the Bot here](https://discord.com/oauth2/authorize?client_id=960533661109878805&scope=bot%20applications.commands&permissions=545394261246)
