


//require discord.js module
const Discord = require('discord.js');
const fetch = require("node-fetch");


//pulls from the config file to use later

    const prefix=process.env.prefix; //prefix to command
    const botToken=process.env.botToken;  //token for bot
    const blessed=process.env.blessed; //to troll alex of course
    const weatherKey=process.env.weatherKey;

    //users
    const sigma=process.env.sigma;
    
    //user roles by city
    const pasco=process.env.pasco;
    const richland=process.env.richland;
    const grandview=process.env.grandview;
    const pullman=process.env.pullman;
    const vegas=process.env.vegas;

    //channel id
    const general=process.env.general;

//creates a new discord client
const client = new Discord.Client();

//Starts the discord bot. triggers when bot logs in
client.on('ready', () => console.log('I have arrived peasantsssssssss'))

//logs bot into discord
client.login(botToken);

//response for help command. displays list of commands and thier uses
const helpResponse=
`
Watcha needsssssss from me?
!miggyscryptoholding - Displays miggys shady crpto holdings
!weather - work in progress. come back later
!help - brings this up dumb fuck
!joke - tells a random joke
!weebscripture - anime quote
!varglu - will insult varglu 99/100 times. 
`;

/*
Listens for user message and looks to see if it matches a command
*/
client.on('message', (msg) => {

    //made it into a variable since i will be repeating this a lot. 
    let userMessage= msg.content.toLowerCase();
    
/*
displays a list of commands
*/
    if(userMessage.startsWith(`${prefix}help`)){
        msg.channel.send(helpResponse);
    }

/*
Will take the users role and display weather corresponding to them. 
 */
    if(userMessage.startsWith(`${prefix}weather`))
    {
        //determines users role in the discord and relates it to a set zip code
        let userZip = findUserZip(msg);

        //pulls from weather api
        const urlFromZip= `https://api.openweathermap.org/data/2.5/weather?zip=${userZip}&units=imperial&appid=${weatherKey}`;

        getFromApiToJSON(urlFromZip)
        .then(data => {
            //displays weather to whole number
            const temperature= Math.floor(data.main['temp']);
            const weatherMessage= `It is currently ${temperature}°F in ${data.name}.`;
            msg.channel.send(weatherMessage);
        })
        .catch(err => console.log(err));
    }

/*
Function that displays miggys crypto holdings
*/
    if (userMessage.startsWith(`${prefix}miggyscryptoholding`)){
        msg.reply(`Idk man yall know hes inconsitent. ${blessed}`);
    } 

/*
If a user was mentioned without any other text it will reply with "sucks"
function exludes myself of course
*/  
    //this regular expression looks for tagged users 
    const taggedExp = new RegExp(String.raw`<@![0-9]{18}>`,'g')

    /*if the string is 22 characthers long it indicates there is no spaces. 
    regular expression checks for what discord shows as a tagged user. 
    makes sure its not me*/
    if((userMessage.length===22) && taggedExp.test(userMessage) && (userMessage!=`<@!${sigma}>`))
        msg.channel.send('sucks');


/*
This function will display a random joke.
It will request a joke from the random joke api and then it will respond with a random joke and punchline
*/
    if(userMessage.startsWith(`${prefix}joke`))
    {
        getFromApiToJSON('https://official-joke-api.appspot.com/jokes/random')
        .then(data => {
            //sends the setup to the channel where the message was posted
            msg.channel.send(data.setup);
            //sends the punchline to the channel where the message was posted after 5 seconds
            setTimeout(() => {msg.channel.send(data.punchline);},5000);
            })
        .catch(err => console.log(err));
    }
/*
This function will display an anime quote
*/    
    if(userMessage.startsWith(`${prefix}weebscripture`))
    {
        getFromApiToJSON(`https://animechanapi.xyz/api/quotes/random`)
        .then((data) => {
            const { quote, character, anime } = data.data[0];
            msg.channel.send(`${quote} - ${character} (${anime})`);
        })
        .catch(err => console.log(err));
    }
    if(userMessage.startsWith(`${prefix}varglu`))
    {
        if ((Math.floor(Math.random() * Math.floor(101)) === 69) && (userMessage!=`<@!${sigma}>`)) {
            const API = `https://complimentr.com/api`;
            getFromApiToJSON(API)
            .then((data) => {
                let gluToYou = data.compliment.replace(" you ", " Varglu ");
                let areToIs = gluToYou.replace(" are ", " is ");
                let haveToHas = areToIs.replace(" have ", " has ");
                let finalMessage = `${haveToHas} - user`;
                msg.channel.send(finalMessage);
            })
            .catch((err) => console.log(err));
        } 
        else {
            const API = `https://insult.mattbas.org//api/insult.json?who=Varglu`;
            getFromApiToJSON(API)
            .then((data) => {
                msg.channel.send(data.insult);
            })
            .catch((err) => console.log(err));
        }
    }
});

/*
Could not find a way to pull a channel key so  im doing this to find the role.
This function will verify which role the user has in the discord channel and return a zip
code correspoinding to that role
*/
function findUserZip(msg){

    //the users role. mainly used to shorten haing to type this multiple times
    let userRole = msg.member.roles.cache;

    if (userRole.has(pasco)){
        msg.channel.send('pasco boiiiiis');
        return '99301';
    }
    else 
    if (userRole.has(richland)) {
        msg.channel.send('too rich for yall');   
        return '99352';
    }
    else 
    if (userRole.has(grandview)){
        msg.channel.send('what a grand view of that ass');
        return '98930';
    }
    else
    if (userRole.has(pullman)) {
        msg.channel.send('you from bum fuck nowhere b');
        return '99163';
    }
    if(userRole.has(vegas)){
        msg.channel.send('id say yous a bettin man');
        return '89122';
    }
    else{
        msg.channel.send('you aint from round these parts are ya');
        return null;
    }
}

/*
Takes in a URL and pulls from an API and then converts the data to JSON
*/
async function getFromApiToJSON(url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
