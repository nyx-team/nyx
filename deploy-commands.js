const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const [, , ...args] = process.argv;

const { readFileSync, readdirSync } = require("fs");

const token =
  process.env.token ??
  (args[0] === "manual"
    ? JSON.parse(
        readFileSync("../config.json", {
          encoding: "utf8",
        })
      ).token
    : null);

const commands = [];
const commandFiles = readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);

commandFiles.forEach((file) => {
  const { data } = require(`./commands/${file}`);
  commands.push(data.toJSON());
});

const clientId = "960533661109878805";

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
