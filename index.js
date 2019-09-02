const express   = require('express');
const fs        = require('fs');
const app       = express();
const Discord   = require('discord.js');
const client    = new Discord.Client();

let https       = require("https");
let jsonMessage = fs.readFileSync('message.json');
let jsonCommand = fs.readFileSync('command.json');
let message     = JSON.parse(jsonMessage);
let cmd         = JSON.parse(jsonCommand);
let cmdValue     = Object.values(cmd);

let cmdList = Object.keys(cmdValue).forEach(function(command) {
    return cmdValue[command];
});

app.set('port', (process.env.PORT || 5000));

// For avoiding Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

console.log(cmdList);


client.on('message', msg => {
    
    switch(msg.content) {
        case cmd.fu             : msg.reply(message.ck);
            break;
        case cmd.help           : msg.reply(cmdList);
            break;
        case cmd.ok             : msg.reply(message.ok);
            break;
        case cmd.kimsphere   : msg.reply(message.kimsphere);
            break;
        case cmd.andylam     : msg.reply(message.andylam);
            break;
        case cmd.asarind     : msg.reply(message.asarind);
            break;
        case cmd.reinforce  : msg.reply(message.special.reinforce);
            break;
        case cmd.sos        : msg.reply(message.special.sos);
            break;
        case cmd.nuke     : msg.reply(message.offensive.nuke);
            break;
        case cmd.trans    : msg.reply(message.objective.trans_1 + 
                                                message.objective.trans_2 + 
                                                message.objective.trans_3 + 
                                                message.objective.trans_4);
            break;

    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'unique-bot');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Oh, it's a new member! Let's welcome ${member} to the channel!` );
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'chat');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Oh, it's a new member! Let's welcome ${member} to the server!` );
});


// Prevent heroku from idling, send request to url every 5 minutes
setInterval(function() {
    https.get("https://u-b.herokuapp.com");
}, 300000);

// Log our bot in using the token
client.login(process.env.bot_token);