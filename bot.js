//Creates discord client and logs in
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.botToken);

//Starts the discord bot. triggers when bot logs in
client.on("ready", () => console.log("I have arrived peasantsssssssss"));

//grabs commands for discord bot
const { commandHandler } = require("./src/commandHandler");

//sends messages to command handler
client.on("message", commandHandler);
