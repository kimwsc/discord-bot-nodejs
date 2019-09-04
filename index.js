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
let cmdValue    = Object.values(cmd);

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

client.on('message', msg => {
    
    switch(msg.content) {
        case cmd.fu         : msg.reply(message.ck);
        break;
        case cmd.ok         : msg.reply(message.ok);
        break;
        case cmd.kimsphere  : msg.reply(message.kimsphere);
        break;
        case cmd.andylam    : msg.reply(message.andylam);
        break;
        case cmd.asarind    : msg.reply(message.asarind);
        break;
        case cmd.reinforce  : msg.reply(message.special.reinforce);
        break;
        case cmd.sos        : msg.reply(message.special.sos);
        break;
        case cmd.trans      : msg.reply(message.objective.trans_1 + 
                                        message.objective.trans_2 + 
                                        message.objective.trans_3 + 
                                        message.objective.trans_4);
        break;

    }
});

client.on('message', msg => {
    
    switch(msg.content) {
        case cmd.offensive.airstrike       : msg.reply(message.offensive.airstrike, {files: ["img_stratagem/airstrike.png"]});
        break;
        case cmd.offensive.closeair       : msg.reply(message.offensive.closeair, {files: ["img_stratagem/close_air.png"]});
        break;
        case cmd.offensive.divebomb       : msg.reply(message.offensive.divebomb, {files: ["img_stratagem/dive_bomb.png"]});
        break;
        case cmd.offensive.hsrun       : msg.reply(message.offensive.hsrun, {files: ["img_stratagem/heavy_strafing_run.png"]});
        break;
        case cmd.offensive.incendiary       : msg.reply(message.offensive.incendiary, {files: ["img_stratagem/incendiary.png"]});
        break;
        case cmd.offensive.missle       : msg.reply(message.offensive.missle, {files: ["img_stratagem/missle.png"]});
        break;
        case cmd.offensive.laser       : msg.reply(message.offensive.laser, {files: ["img_stratagem/orbital_laser.png"]});
        break;
        case cmd.offensive.railcannon       : msg.reply(message.offensive.railcannon, {files: ["img_stratagem/railcannon.png"]});
        break;
        case cmd.offensive.nuke       : msg.reply(message.offensive.nuke, {files: ["img_stratagem/shredder_missle.png"]});
        break;
        case cmd.offensive.precision       : msg.reply(message.offensive.precision, {files: ["img_stratagem/sledge_precision.png"]});
        break;
        case cmd.offensive.staticfield       : msg.reply(message.offensive.staticfield, {files: ["img_stratagem/static_field.png"]});
        break;
        case cmd.offensive.srun       : msg.reply(message.offensive.srun, {files: ["img_stratagem/strafing_run.png"]});
        break;
        case cmd.offensive.thunderer  : msg.reply(message.offensive.thunderer, {files: ["img_stratagem/thunderer.png"]});
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