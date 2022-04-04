import json
from os.path import exists

from discord.errors import LoginFailure
from discord.ext.commands import AutoShardedBot

class Bot(AutoShardedBot):
    def __init__(self, command_prefix, *args, **options):
        super().__init__(command_prefix, *args, **options)

# If the file doesn't exist
# raise an Exception
if not exists('../config.json'):
    raise Exception('No Config File found.')

# Get config file
config_file = ''
with open('../config.json', 'r') as f:
    config_file = f.read()

config = json.loads(config_file)

bot = Bot(command_prefix=',')

@bot.listen()
async def on_ready():
    print('Bot is Ready!')

try:
    bot.run(config['token'])
except LoginFailure as e:
    print(e)
