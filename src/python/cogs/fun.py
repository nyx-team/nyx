import discord
from discord.ext import commands

class Fun(commands.Cog, name="Fun Commands"):
    def __init__(self, bot):
        self.bot = bot
        
    @commands.command()
    async def test(self, ctx):
        await ctx.send("test pass")
        
def setup(bot):
    bot.add_cog(Fun(bot))

    #test SSS