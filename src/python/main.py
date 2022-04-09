import json
from os.path import exists
import os

from discord.errors import LoginFailure
from discord.ext.commands import AutoShardedBot

class Bot(AutoShardedBot):
    def __init__(self, command_prefix, *args, **options):
        super().__init__(command_prefix, *args, **options)

if not exists('../config.json'):
    raise Exception('No Config File found.')

# Get config file
config_file = ''
with open('../config.json', 'r') as f:
    config_file = f.read()

config = json.loads(config_file)

bot = Bot(command_prefix=',')

#Search for cogs in /cogs directory and load them automatically
for filename in os.listdir('./cogs'):
    if filename.endswith('.py'):
        bot.load_extension(f'cogs.{filename[:-3]}')

@bot.listen()
async def on_ready():
    print('Bot is Ready!')

if __name__ == '__main__':
    try:
        bot.run(config['token'])
    except LoginFailure as e:
        print(e)
