# Nyx

***This is the JS Branch of the Bot!***

**Nyx is a Multi-purpose, open-source Discord Bot, made in JS and Python.**

- [JavaScript Branch](https://github.com/nyx-team/nyx/tree/main)
- [Python Branch](https://github.com/nyx-team/nyx/tree/python)

[Invite the Bot here](https://discord.com/oauth2/authorize?client_id=960533661109878805&scope=bot%20applications.commands&permissions=545394261246)

## Configuration

Configuration file is Mandatory for the Bot to work, so follow the steps below on how to add a config for the 2 branches

### JSON Config File

**Recommended for** ***Both*** **Branches**

Copy this example here to *a* branch:

```json
{
    "token": "TOKEN",
    "mongo_uri": "uri"
}
```

Should be placed in root directory of the branch you picked, and named as `config.json`


### Using `dotenv`

**Recommended for JS branch**

First, install `dotenv`
By doing:

```sh-session
npm install -D dotenv
```

Then add a `.env` file in the root directory
Like this:

```env
token="TOKEN HERE"
mongo_uri="uri"
```

**Note:** the Name must be exactly `token` otherwise you will get an error when trying to start the Bot.
