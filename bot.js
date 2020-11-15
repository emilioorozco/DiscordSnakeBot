//just a bunch of tokens and keys so that i can reference them later
const mdiggyToken   = '409065099274223617'
const oscarToken    = '677038220566986754'
const henryToken    = '384438115596632066'
const alexToken     = '231951116148015105'
const obamaToken    = '340278485979365396'
const sigmaToken    = '379121759913377833'

//array of keys correlating to each user
const tokenArray =new Array(
    '409065099274223617',   //miggy
    '677038220566986754',   //Oscar
    '384438115596632066',   //Henry
    '231951116148015105',   //Alex
    '340278485979365396',   //Obama
    '379121759913377833');  //Sigma


//require discord.js module
const Discord = require('discord.js');
const fetch = require("node-fetch");

//pulls from the config file to use later
const { 
    prefix, //prefix to command
    token,  //token for bot
    blessed, //to troll alex of course
    
    //user roles by city
    pasco,
    richland,
    grandview,
    pullman
} 
    = require('./config.json');

//creates a new discord client
const client = new Discord.Client();

//Starts the discord bot. triggers when bot logs in
client.on('ready', () => console.log('Snake is ready'))

//logs bot into discord
client.login(token);

//response for help command. displays list of commands and thier uses
const helpResponse=
`
!MiggysCryptoHolding - Displays miggys shady crpto holdings
!weather - work in progress. come back later
!help - brings this up dumb fuck
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
    if(userMessage === `${prefix}weather`)
    {
        let userRole = findUserZip(msg);
        getWeather(userRole,msg);
    }

/*
Function that displays miggys crypto holdings
*/
    if (userMessage === `${prefix}miggyscryptoholding`){
        msg.reply(`100% $LINK forever. ${blessed}`);
    } 

/*
If a user was mentioned without any other text it will reply with "sucks"
function exludes myself of course
*/  
    //looks to see if the user is not me
    for(let i in tokenArray){
        if((userMessage === `<@!${tokenArray[i]}>`) && i!=5){
            msg.channel.send('sucks');
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
    else{
        msg.channel.send('you aint from round these parts are ya');
        return null;
    }
     
}

function getWeather(zip,msg){
    const weatherKey ='d54d2293f2650886e2c18b458680edd3';

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${weatherKey}`)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      //  console.log(data);

        let weatherMessage=
        `It is currently ${data.main['temp']}°F  in ${data.name}.`;
        msg.channel.send(weatherMessage);
        console.log(data.main['temp']);

  })
  .catch(function() {
    // catch any errors
  });

}


