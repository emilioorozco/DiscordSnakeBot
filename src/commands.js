import { getFromApiToJSON, findUserZip } from "./helper.js";

/*
This function will display a random joke.
It will request a joke from the random joke api and then it will respond with a random joke and punchline
*/
export const joke = (msg) => {
  getFromApiToJSON("https://official-joke-api.appspot.com/jokes/random")
    .then((data) => {
      //sends the setup to the channel where the message was posted
      msg.channel.send(data.setup);
      //sends the punchline to the channel where the message was posted after 5 seconds
      setTimeout(() => {
        msg.channel.send(data.punchline);
      }, 5000);
    })
    .catch((err) => console.log(err));
};

/*
Function that displays miggys crypto holdings
*/
export const miggysCryptoHolding = (msg) => {
  msg.reply(`Idk man yall know hes inconsitent. ${process.env.blessed}`);
};

/*
the message passed in will be a ticker symbol. Function will display tickers price tag.
 */
export const stonks = (msg) => {
  let ticker = userMessage.substring(1);
  ticker = ticker.toUpperCase();
  getFromApiToJSON(
    `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.stonkKey}`
  )
    .then((data) => {
      const price = data.c;
      if (price > 0) {
        msg.channel.send(`${ticker}: $${price}`);
      }
    })
    .catch((err) => console.log(err));
};

/*
This function will insult varglu
*/
export const trashglu = (msg) => {
  getFromApiToJSON(`https://insult.mattbas.org//api/insult.json?who=Varglu`)
    .then((data) => {
      msg.channel.send(data.insult);
    })
    .catch((err) => console.log(err));
};

/*
Will take the users role and display weather corresponding to them. 
 */
export const weather = (msg) => {
  //determines users role in the discord and relates it to a set zip code
  let userZip = findUserZip(msg);

  //pulls from weather api
  getFromApiToJSON(
    `https://api.openweathermap.org/data/2.5/weather?zip=${userZip}&units=imperial&appid=${process.env.weatherKey}`
  )
    .then((data) => {
      //displays weather to whole number
      const temperature = Math.floor(data.main["temp"]);
      const weatherMessage = `It is currently ${temperature}°F in ${data.name}.`;
      msg.channel.send(weatherMessage);
    })
    .catch((err) => console.log(err));
};

/*
This function will display a random anime quote
*/
export const weebScripture = (msg) => {
  getFromApiToJSON(`https://animechanapi.xyz/api/quotes/random`)
    .then((data) => {
      const { quote, character, anime } = data.data[0];
      msg.channel.send(`${quote} - ${character} (${anime})`);
    })
    .catch((err) => console.log(err));
};

//response for help command. displays list of commands and thier uses
export const help = (msg) => {
  msg.channel.send(`
  Watcha need from me ya ssssssnake?
  !joke - Tells a random joke.
  !miggyscryptoholding - Displays miggys shady crpto holdings.
  !trashglu - Will insult varglu 
  !weather - Displays the weather in your location.
  !weebscripture - Random anime quote.
  $(3 letter ticker) - Displays current price for stonk
  !help - Brings this up, dumb fuck.
  ${process.env.blessed}
  `);
};
