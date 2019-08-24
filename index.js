const express   = require('express');
const app       = express();
const Discord   = require('discord.js');
const client    = new Discord.Client();

var http        = require("http");

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
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
    if (msg.content === 'fu') {
        msg.reply('ck!');
    }
});

client.on('message', msg => {
    if (msg.content === "whoiskimsphere") {
        msg.reply("known as kimsphere in Helldivers, a curious cat from hell");
    }
});

client.on('message', msg => {
    if (msg.content === 'whoisandylam') {
        msg.reply("known as qqww in Helldivers, a friendly 15 years old pro cyclist from Hong Kong!");
    }
});

client.on('message', msg => {
    if (msg.content === 'whoisasarind') {
        msg.reply("known as Asarind in Helldivers, a pro and supportive teammate, a fan of B.duck!");
    }
});


client.on('message', msg => {
    if (msg.content === 'ok good') {
        msg.reply("ok bye.");
    }
});

client.on('message', msg => {
    if (msg.content === 'hi u-b') {
        msg.reply("What can I help you? These are available command: ```whoiskimsphere``````whoisandylam``````whoisasarind``````ok good```");
    }
});

setInterval(function() {
    http.get("https://u-b.herokuapp.com");
}, 300000); // every 5 minutes (300000)

// Log our bot in using the token
client.login(process.env.bot_token);