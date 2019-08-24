const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const Discord = require('discord.js');
const client = new Discord.Client();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


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