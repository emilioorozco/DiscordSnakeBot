import * as Commands from "./commands.js";

//list of commands that can be used with the specified prefix. Easier to call them later on this way
const commands = {
  joke: Commands.joke,
  miggyscryptoholding: Commands.miggysCryptoHolding,
  miggyscryptoholdings: Commands.miggysCryptoHolding, //being lazy here because they cant remember if it has an S or not
  varglu: Commands.trashglu,
  weather: Commands.weather,
  weebScripture: Commands.weebScripture,
  help: Commands.help,
};
//prefix that we will be looking for in our messages for certain commands
const prefix = "!";
//this regular expression looks for tagged users
const taggedExp = new RegExp(String.raw`<@![0-9]{18}>`, "g");

export const commandHandler = (msg) => {
  let firstChar = msg.content.charAt(0);
  let userMessage = msg.content.toLowerCase().substring(1); // change message to lowercase
  let rawMessage = msg.content;

  if (firstChar === prefix && userMessage in commands) {
    commands[userMessage](msg);
  }

  if (firstChar === "$") Commands.stonks(msg);

  /*if the string is 22 characthers long it indicates there is no spaces. 
    regular expression checks for what discord shows as a tagged user. 
    makes sure its not me*/
  if (
    rawMessage.length === 22 &&
    taggedExp.test(rawMessage) &&
    rawMessage != `<@!${process.env.sigma}>`
  )
    msg.channel.send(`sucks ${process.env.blessed}`);
};
