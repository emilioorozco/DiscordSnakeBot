


//require discord.js module
const Discord = require('discord.js');
const fetch = require("node-fetch");

//pulls from the config file to use later
const { 
    prefix, //prefix to command
    botToken,  //token for bot
    blessed, //to troll alex of course
    weatherKey,

    //users
    sigma,
    
    //user roles by city
    pasco,
    richland,
    grandview,
    pullman,

    //channel id
    general
} 
    = require('./config.json');

//creates a new discord client
const client = new Discord.Client();

//Starts the discord bot. triggers when bot logs in
client.on('ready', () => client.channels.cache.get(general).send('I have arrived peasantsssssssss'))

//logs bot into discord
client.login(botToken);

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
    //this regular expression looks for tagged users 
    const taggedExp = new RegExp(String.raw`<@![0-9]{18}>`,'g')

    //if the string is 22 characthers long it indicates there is no spaces. 
    //regular expression checks for what discord shows as a tagged user. 
    //makes sure its not me
    if((userMessage.length===22) && taggedExp.test(userMessage) && (userMessage!=`<@!${sigma}>`))
        msg.channel.send('sucks');
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


