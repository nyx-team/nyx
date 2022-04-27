import discord
from discord.ext import commands
import random

class Fun(commands.Cog, name="Fun commands"):
    def __init__(self, bot):
        self.bot = bot
        
    @commands.command()
    async def test(self, ctx):
        await ctx.send("test pass")

    @commands.cooldown(1, 30, commands.BucketType.member)
    @commands.command()
    async def guess(self, ctx):
        def check(message):
            return message.author == ctx.author and message.channel == ctx.message.channel
        
        number_message = await ctx.send("Guess the number from 1-10")
        rand = random.randint(1, 10)
        msg = await self.bot.wait_for('message', check=check)

        try:
            if int(msg.content) == rand:
                await number_message.edit(content=f"YES! The number was {rand}!")
            else:
                await number_message.edit(content=f"Aw man, the number was {rand} and not {msg.content}.")
        except TypeError:
            await number_message.edit(content='*You did not send a valid number.*')
        
def setup(bot):
    bot.add_cog(Fun(bot))
