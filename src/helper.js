import fetch from "node-fetch";

/*
Takes in a URL and pulls from an API and then converts the data to JSON
*/
export const getFromApiToJSON = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};
/*
Could not find a way to pull a channel key so  im doing this to find the role.
This function will verify which role the user has in the discord channel and return a zip
code correspoinding to that role as well as prints a silly message.
*/
export const findUserZip = (msg) => {
  switch (msg.member.roles.cache.toString()) {
    case process.env.pasco:
      msg.channel.send("pasco boiiiiis");
      return "99301";
    case has(process.env.richland):
      msg.channel.send("too rich for yall");
      return "99352";
    case has(process.env.grandview):
      msg.channel.send("what a grand view of that ass");
      return "98930";
    case has(process.env.pullman):
      msg.channel.send("you from bum fuck nowhere b");
      return "99163";
    case has(process.env.vegas):
      msg.channel.send("id say yous a bettin man");
      return "89122";
    default:
      msg.channel.send("you aint from round these parts are ya");
      return null;
  }
};
