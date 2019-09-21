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
        case cmd.middle_finger      : msg.reply({files: ["stickers/rick_and_morty_mf.gif"]});
        break;
        case cmd.bdangry      : msg.reply({files: ["stickers/bduck_angry.gif"]});
        break;
        case cmd.bdass      : msg.reply({files: ["stickers/bduck_ass.gif"]});
        break;
        case cmd.bdfaint      : msg.reply({files: ["stickers/bduck_faint.gif"]});
        break;
        case cmd.bdfull      : msg.reply({files: ["stickers/bduck_full.gif"]});
        break;
        case cmd.bdkeybord      : msg.reply({files: ["stickers/bduck_keybord.gif"]});
        break;
        case cmd.bdphone      : msg.reply({files: ["stickers/bduck_phone.gif"]});
        break;
        case cmd.bdplay      : msg.reply({files: ["stickers/bduck_play.gif"]});
        break;
        case cmd.bdlaugh    : msg.reply({files: ["stickers/bduck_laugh.gif"]});
        break;
        case cmd.bdbye      : msg.reply({files: ["stickers/bduck_bye.gif"]});
        break;
        case cmd.bddizzy      : msg.reply({files: ["stickers/bduck_dizzy.gif"]});
        break;
        case cmd.bdhello      : msg.reply({files: ["stickers/bduck_hello.gif"]});
        break;
        case cmd.bdlol      : msg.reply({files: ["stickers/bduck_lol.gif"]});
        break;
        case cmd.bdlove      : msg.reply({files: ["stickers/bduck_love.gif"]});
        break;
        case cmd.bdno      : msg.reply({files: ["stickers/bduck_no.gif"]});
        break;
        case cmd.bdnoodle      : msg.reply({files: ["stickers/bduck_noodle.gif"]});
        break;
        case cmd.bdok      : msg.reply({files: ["stickers/bduck_ok.gif"]});
        break;
        case cmd.bdomg      : msg.reply({files: ["stickers/bduck_omg.gif"]});
        break;
        case cmd.bdsad      : msg.reply({files: ["stickers/bduck_sad.gif"]});
        break;
        case cmd.bdsleep      : msg.reply({files: ["stickers/bduck_sleep.gif"]});
        break;
        case cmd.bdwoo      : msg.reply({files: ["stickers/bduck_woo.gif"]});
        break;
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
        case cmd.offensive.airstrike    : msg.reply(message.offensive.airstrike, {files: ["img_stratagem/airstrike.png"]});
        break;
        case cmd.offensive.closeair     : msg.reply(message.offensive.closeair, {files: ["img_stratagem/close_air.png"]});
        break;
        case cmd.offensive.divebomb     : msg.reply(message.offensive.divebomb, {files: ["img_stratagem/dive_bomb.png"]});
        break;
        case cmd.offensive.hsrun        : msg.reply(message.offensive.hsrun, {files: ["img_stratagem/heavy_strafing_run.png"]});
        break;
        case cmd.offensive.incendiary   : msg.reply(message.offensive.incendiary, {files: ["img_stratagem/incendiary.png"]});
        break;
        case cmd.offensive.missle       : msg.reply(message.offensive.missle, {files: ["img_stratagem/missle.png"]});
        break;
        case cmd.offensive.laser        : msg.reply(message.offensive.laser, {files: ["img_stratagem/orbital_laser.png"]});
        break;
        case cmd.offensive.railcannon   : msg.reply(message.offensive.railcannon, {files: ["img_stratagem/railcannon.png"]});
        break;
        case cmd.offensive.nuke         : msg.reply(message.offensive.nuke, {files: ["img_stratagem/shredder_missle.png"]});
        break;
        case cmd.offensive.precision    : msg.reply(message.offensive.precision, {files: ["img_stratagem/sledge_precision.png"]});
        break;
        case cmd.offensive.staticfield  : msg.reply(message.offensive.staticfield, {files: ["img_stratagem/static_field.png"]});
        break;
        case cmd.offensive.srun         : msg.reply(message.offensive.srun, {files: ["img_stratagem/strafing_run.png"]});
        break;
        case cmd.offensive.thunderer    : msg.reply(message.offensive.thunderer, {files: ["img_stratagem/thunderer.png"]});
        break;
    
    }
    
});

client.on('message', msg => {

    switch(msg.content) {
        case cmd.weapon.shotgun         : msg.reply({files: ["img_weapon/arc_shotgun.png"]});
        break;
        case cmd.weapon.thrower         : msg.reply({files: ["img_weapon/arc_thrower.png"]});
        break;
        case cmd.weapon.breaker         : msg.reply({files: ["img_weapon/breaker.png"]});
        break;
        case cmd.weapon.camper          : msg.reply({files: ["img_weapon/camper.png"]});
        break;
        case cmd.weapon.constitution    : msg.reply({files: ["img_weapon/constitution.png"]});
        break;
        case cmd.weapon.defender        : msg.reply({files: ["img_weapon/defender.png"]});
        break;
        case cmd.weapon.double_freedom  : msg.reply({files: ["img_weapon/double_freedom.png"]});
        break;
        case cmd.weapon.gunslinger      : msg.reply({files: ["img_weapon/gunslinger.png"]});
        break;
        case cmd.weapon.justice         : msg.reply({files: ["img_weapon/justice.png"]});
        break;
        case cmd.weapon.knight          : msg.reply({files: ["img_weapon/knight.png"]});
        break;
        case cmd.weapon.liberator       : msg.reply({files: ["img_weapon/liberator.png"]});
        break;
        case cmd.weapon.ninja           : msg.reply({files: ["img_weapon/ninja.png"]});
        break;
        case cmd.weapon.paragon         : msg.reply({files: ["img_weapon/paragon.png"]});
        break;
        case cmd.weapon.patriot         : msg.reply({files: ["img_weapon/patriot.png"]});
        break;
        case cmd.weapon.peacemaker      : msg.reply({files: ["img_weapon/peacemaker.png"]});
        break;
        case cmd.weapon.punisher        : msg.reply({files: ["img_weapon/punisher.png"]});
        break;
        case cmd.weapon.pyro            : msg.reply({files: ["img_weapon/pyro.png"]});
        break;
        case cmd.weapon.railgun         : msg.reply({files: ["img_weapon/railgun.png"]});
        break;
        case cmd.weapon.scorcher        : msg.reply({files: ["img_weapon/scorcher.png"]});
        break;
        case cmd.weapon.scythe          : msg.reply({files: ["img_weapon/scythe.png"]});
        break;
        case cmd.weapon.sickle          : msg.reply({files: ["img_weapon/sickle.png"]});
        break;
        case cmd.weapon.singe           : msg.reply({files: ["img_weapon/singe.png"]});
        break;
        case cmd.weapon.stalwart        : msg.reply({files: ["img_weapon/stalwart.png"]});
        break;
        case cmd.weapon.suppressor      : msg.reply({files: ["img_weapon/suppressor.png"]});
        break;
        case cmd.weapon.tanto           : msg.reply({files: ["img_weapon/tanto.png"]});
        break;
        case cmd.weapon.trident         : msg.reply({files: ["img_weapon/trident.png"]});
        break;


    }
});


// Create an event listener for new guild members
client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(ch => ch.name === 'unique-bot');
    if (!channel) return;
    channel.send(`Let's welcome ${member} to the server!`, {files: ["img_stratagem/shredder_missle.png"]});
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'chat');
    if (!channel) return;
    channel.send(`Let's welcome ${member} to the server!!!`, {files: ["img_stratagem/shredder_missle.png"]});
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'ub-dev');
    if (!channel) return;
    channel.send(`Let's welcome ${member} to the server!`, {files: ["img_stratagem/shredder_missle.png"]});
});


// Prevent heroku from idling, send request to url every 5 minutes
setInterval(function() {
    https.get("https://u-b.herokuapp.com");
}, 300000);

// Log our bot in using the token
// client.login('NjE1MDQ3MTU4OTU3MDgwNTg2.XW_crw.zRax34HTXX2aCb2EZTUczF3uUik');
client.login(process.env.bot_token);