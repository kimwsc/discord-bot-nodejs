const express   = require('express');
const app       = express();
const Discord   = require('discord.js');
const client    = new Discord.Client();

var http        = require("http");

app.set('port', (process.env.PORT || 5000));

setInterval(function() {
    http.get("https://u-b.herokuapp.com");
}, 300000); // every 5 minutes (300000)

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
        msg.reply("kimsphere known as kimsphere in Helldivers, the smartest person in the hell");
    }
});

client.on('message', msg => {
    if (msg.content === 'whoisandylam') {
        msg.reply("andylam known as qqww in Helldivers, he's a 15 years old kid and live in Hong Kong, also a pro cyclist!");
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


// Log our bot in using the token
client.login('NjE0NzI0ODU4Mzk5Njg2NjY0.XWDqhg.bQZnfHfj_SBrifxg0SYucOlS4eE');