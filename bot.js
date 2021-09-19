//Creates discord client and logs in
import { Client } from "discord.js";
const client = new Client();
client.login(process.env.botToken);

//Starts the discord bot. triggers when bot logs in
client.on("ready", () => console.log("I have arrived peasantsssssssss"));

//grabs commands for discord bot
import { commandHandler } from "./src/commandHandler";

//sends messages to command handler
client.on("message", commandHandler);
