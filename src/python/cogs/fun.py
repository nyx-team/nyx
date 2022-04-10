import discord
from discord.ext import commands
import random

class Fun(commands.Cog, name="Fun Commands"):
    def __init__(self, bot):
        self.bot = bot
        
    @commands.command()
    async def test(self, ctx):
        await ctx.send("test pass")

    @commands.cooldown(commands.BucketType.user, 1, 30)
    @commands.command()
    async def guess(self, ctx):
        def check(message):
            return message.author == ctx.author and message.channel == ctx.message.channel
        
        a = await ctx.send("Guess the number from 1-10")
        rand = random.randint(1, 10)
        msg = await self.bot.wait_for('message', check=check)
        if msg == rand:
            await a.edit(content=f"YES! The number was {rand}!")
        else:
            await a.edit(content=f"Aw man, the number was {rand} and not {msg.content}.")
        
def setup(bot):
    bot.add_cog(Fun(bot))