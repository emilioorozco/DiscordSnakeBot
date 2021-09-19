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
  const { pasco, richland, grandview, pullman, vegas } = process.env;

  const zipCodes = {
    [pasco]: ["99301", "pasco boiiiiis"],
    [richland]: ["99352", "too rich for yall"],
    [grandview]: ["98930", "what a grand view of that ass"],
    [pullman]: ["99163", "you from bum fuck nowhere b"],
    [vegas]: ["89122", "id say yous a bettin man"],
  };

  //if not found these are the defaults
  let zipMessage = "you aint from round these parts are ya";
  let zip = null;

  Object.keys(zipCodes).forEach((key) => {
    if (msg.member.roles.cache.has(key)) {
      zipMessage = zipCodes[key][1];
      zip = zipCodes[key][0];
    }
  });
  msg.channel.send(zipMessage);
  return zip;
};
