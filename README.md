# Nyx

**Nyx is a Multi-purpose, open-source Discord Bot, made in JS and Python.**

[Invite the Bot here](https://discord.com/oauth2/authorize?client_id=960533661109878805&scope=bot%20applications.commands&permissions=545394261246)

## Configuration

**There are two ways to configure the Bot:**

Soon we'll try to make the two config options globally

### JSON Config File

***This one works both in JS and Python***

Generate one by doing: 

`python make_config.py`

It should generate a `config.json` file in the `src` directory.

Then fill in the credentials needed to run the bot (e.g. `"TOKEN"`)

`config.json`**:**

```json
{
    "token": "TOKEN HERE"
}
```

<br/>
### Using `dotenv`

***This one only works for JS***

First, install `dotenv` IN `src/js` directory, not in root. 
By doing:

```sh-session
npm install -D dotenv
```

Then add a `.env` file in `src/js` directory
Like this:

```env
token="TOKEN HERE"
```

**Note:** the Name must be exactly `token` otherwise you will an error when trying to start the Bot.
