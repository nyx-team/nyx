import discord
from discord.ext import commands
import mysql.connector

def cursor():
    #MySQL Database - Hosted in https://remotemysql.com
    database = mysql.connector.connect(
        host="remotemysql.com",
        username="c7PR2MV2Mr",
        password="0bU1tE6SWd",
        database="c7PR2MV2Mr"
    )
    cursor = database.cursor()
    return cursor

class Mod(commands.Cog, name="Moderator commands"):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(brief="test")
    async def mysqltest(self, ctx, command):
        await ctx.send(cursor.execute(command) or "Done.")

def setup(bot):
    bot.add_cog(Mod(bot))