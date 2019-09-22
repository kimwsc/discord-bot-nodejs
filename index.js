const express   = require('express');
const fs        = require('fs');
const app       = express();
const Discord   = require('discord.js');
const client    = new Discord.Client();
const path      = require('path');

let https       = require("https");
let jsonMessage = fs.readFileSync('message.json');
let jsonCommand = fs.readFileSync('command.json');
let message     = JSON.parse(jsonMessage);
let cmd         = JSON.parse(jsonCommand);

app.set('port', (process.env.PORT || 5000));

// For avoiding Heroku $PORT error
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname+ 'views/index.html'));
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});

/*
|-----------------------------------------------------------------------------
| /help Command
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    if (msg.content.toLowerCase() === "/help") {
        
        const helpCommandEmbed = new Discord.RichEmbed()
        .setColor('#fbb3ff')
        .attachFile('img_misc/hisako.jpg')
        .setAuthor("Hi, I'm Hisako, how can I help you?", 'attachment://hisako.jpg')
        .setDescription('Command Prefix : `/`')
        .setThumbnail('attachment://hisako.jpg')
        .addField('❯ B.Duck Stickers', '`bduck`', true)
        .addField('❯ HELLDIVERS™', '`helldivers`', true)
        .addField('❯ Miscellaneous', '`misc`', true)
        .setTimestamp()
        .setFooter('Hisako');

        msg.channel.send(helpCommandEmbed);
    }
});

/*
|-----------------------------------------------------------------------------
| B.duck Stickers Command List
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    if (msg.content.toLowerCase() === "/bduck") {
        
        const bduckEmbed = new Discord.RichEmbed()
        .setColor('#ffd321')
        .setAuthor('B.Duck', 'https://thumbs.gfycat.com/MajorWatchfulCarp-size_restricted.gif')
        .setDescription('No prefix')
        .setThumbnail('https://cdn.streamelements.com/uploads/33f405cc-22ce-45a8-9f92-a01efedb5b62.gif')
        .addField('❯ Available stickers', 
                    '`bdlaugh` | '+
                    '`bdbye` | '+
                    '`bdangry` | '+
                    '`bdlol` | '+
                    '`bdno` | '+
                    '`bddizzy` | '+
                    '`bdhello` | '+
                    '`bdlove` | '+
                    '`bdsad` | '+
                    '`bdwoo` | '+
                    '`bdsleep` | '+
                    '`bdomg` | '+
                    '`bdnoodle` | '+
                    '`bdok` | '+
                    '`bdass` | '+
                    '`bdfaint` | '+
                    '`bdfull` | '+
                    '`bdkeyboard` | '+
                    '`bdphone` | '+
                    '`bdplay`', true)
        .setTimestamp()
        .setFooter('Hisako');
    
    msg.channel.send(bduckEmbed);
            
   
    }

});

/*
|-----------------------------------------------------------------------------
| B.duck Stickers Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {
    
    switch(msg.content.toLowerCase()) {
        case cmd.bdangry        : msg.channel.send({files: ["stickers/bduck_angry.gif"]});
        break;
        case cmd.bdass          : msg.channel.send({files: ["stickers/bduck_ass.gif"]});
        break;
        case cmd.bdfaint        : msg.channel.send({files: ["stickers/bduck_faint.gif"]});
        break;
        case cmd.bdfull         : msg.channel.send({files: ["stickers/bduck_full.gif"]});
        break;
        case cmd.bdkeyboard      : msg.channel.send({files: ["stickers/bduck_keyboard.gif"]});
        break;
        case cmd.bdphone        : msg.channel.send({files: ["stickers/bduck_phone.gif"]});
        break;
        case cmd.bdplay         : msg.channel.send({files: ["stickers/bduck_play.gif"]});
        break;
        case cmd.bdlaugh        : msg.channel.send({files: ["stickers/bduck_laugh.gif"]});
        break;
        case cmd.bdbye          : msg.channel.send({files: ["stickers/bduck_bye.gif"]});
        break;
        case cmd.bddizzy        : msg.channel.send({files: ["stickers/bduck_dizzy.gif"]});
        break;
        case cmd.bdhello        : msg.channel.send({files: ["stickers/bduck_hello.gif"]});
        break;
        case cmd.bdlol          : msg.channel.send({files: ["stickers/bduck_lol.gif"]});
        break;
        case cmd.bdlove         : msg.channel.send({files: ["stickers/bduck_love.gif"]});
        break;
        case cmd.bdno           : msg.channel.send({files: ["stickers/bduck_no.gif"]});
        break;
        case cmd.bdnoodle       : msg.channel.send({files: ["stickers/bduck_noodle.gif"]});
        break;
        case cmd.bdok           : msg.channel.send({files: ["stickers/bduck_ok.gif"]});
        break;
        case cmd.bdomg          : msg.channel.send({files: ["stickers/bduck_omg.gif"]});
        break;
        case cmd.bdsad          : msg.channel.send({files: ["stickers/bduck_sad.gif"]});
        break;
        case cmd.bdsleep        : msg.channel.send({files: ["stickers/bduck_sleep.gif"]});
        break;
        case cmd.bdwoo          : msg.channel.send({files: ["stickers/bduck_woo.gif"]});
        break;
    }
});

/*
|-----------------------------------------------------------------------------
| Miscellaneous Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    if (msg.content.toLowerCase() === "/misc") {
        
        const miscEmbed = new Discord.RichEmbed()
        .setColor('#fafafa')
        .attachFile('img_misc/hisako.jpg')
        .setAuthor('MISC', 'attachment://hisako.jpg')
        .setDescription('Here are some MISC commands')
        .addField('❯ Miscellaneous', '`fu` | `ok good` | `/middlefinger` | `/ws kimsphere` | `/ws andylam` | `/ws asarind` | `/cqface`', true)
        .setTimestamp()
        .setFooter('Hisako');

        msg.channel.send(miscEmbed);
    }
});



client.on('message', msg => {

    switch(msg.content.toLowerCase()) {
        case cmd.middle_finger  : msg.channel.send({files: ["stickers/rick_and_morty_mf.gif"]});
        break;
        case cmd.cqface         : msg.channel.send({files: ["stickers/cqface.gif"]});
        break;
        case cmd.fu             : msg.channel.send(message.ck);
        break;
        case cmd.ok             : msg.channel.send(message.ok);
        break;
        case cmd.kimsphere      : msg.channel.send(message.kimsphere);
        break;
        case cmd.andylam        : msg.channel.send(message.andylam);
        break;
        case cmd.asarind        : msg.channel.send(message.asarind);
        break;
        
    }

});

/*
|-----------------------------------------------------------------------------
| Helldivers Command List
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    if (msg.content.toLowerCase() === "/helldivers") {
        
        const helldiversEmbed = new Discord.RichEmbed()
        .setColor('#d4d4d4')
        .setAuthor('HELLDIVERS™', 'https://steamuserimages-a.akamaihd.net/ugc/88224496145598035/E12BE9A061F526B4898A69E81B26D19148525FC3/','https://helldivers.gamepedia.com/Stratagems')
        .setDescription('Command Prefix : `/`')
        .setThumbnail('https://steamuserimages-a.akamaihd.net/ugc/88224496145598035/E12BE9A061F526B4898A69E81B26D19148525FC3/')
        .addField('❯ Offensive Stratagems', 
                    '`airstrike` | '+ 
                    '`closeair` | '+ 
                    '`divebomb` | '+
                    '`hsrun` | '+
                    '`incendiary` | '+
                    '`missle` | '+
                    '`laser` | '+
                    '`railcannon` | '+
                    '`nuke` | '+
                    '`precision` | '+
                    '`staticfield` | '+
                    '`srun` | '+
                    '`thunderer`', true)
        .addField('❯ Defensive Stratagems', 
                    '`at47` | '+
                    '`barrier` | '+
                    '`beacon` | '+
                    '`drone` | '+
                    '`mine` | '+
                    '`turret launcher` | '+
                    '`turret minigun` | '+
                    '`turret railcannon` | '+
                    '`smokeround` | '+
                    '`stunmine` | '+
                    '`tesla` | '+
                    '`turrets`' , true)
        .addField('❯ Weapons', 
                    '`shotgun` | '+
                    '`thrower` | '+
                    '`breaker` | '+
                    '`camper` | '+
                    '`constitution` | '+
                    '`defender` | '+
                    '`doublefreedom` | '+
                    '`gunslinger` | '+
                    '`justice` | '+
                    '`knight` | '+
                    '`liberator` | '+
                    '`ninja` | '+
                    '`paragon` | '+
                    '`patriot` | '+
                    '`peacemaker` | '+
                    '`punisher` | '+
                    '`pyro` | '+
                    '`railgun` | '+
                    '`scorcher` | '+
                    '`scythe` | '+
                    '`sickle` | '+
                    '`singe` | '+
                    '`stalwart` | '+
                    '`suppressor` | '+
                    '`tanto` | '+
                    '`trident`', true)
        .addField('❯ Special Stratagems', '`reinforce` | `sos` | `offensive`', true)
        .addField('❯ Transmitter Objective Key','`trans`',true)
        .setTimestamp()
        .setFooter('Hisako');

        msg.channel.send(helldiversEmbed);
    }
});

/*
|-----------------------------------------------------------------------------
| Helldivers Offensive Stratagem Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {
    
    switch(msg.content.toLowerCase()) {
        case cmd.offensive.airstrike    : msg.channel.send(message.offensive.airstrike, {files: ["img_stratagem/offensive/airstrike.png"]});
        break;
        case cmd.offensive.closeair     : msg.channel.send(message.offensive.closeair, {files: ["img_stratagem/offensive/close_air.png"]});
        break;
        case cmd.offensive.divebomb     : msg.channel.send(message.offensive.divebomb, {files: ["img_stratagem/offensive/dive_bomb.png"]});
        break;
        case cmd.offensive.hsrun        : msg.channel.send(message.offensive.hsrun, {files: ["img_stratagem/offensive/heavy_strafing_run.png"]});
        break;
        case cmd.offensive.incendiary   : msg.channel.send(message.offensive.incendiary, {files: ["img_stratagem/offensive/incendiary.png"]});
        break;
        case cmd.offensive.missle       : msg.channel.send(message.offensive.missle, {files: ["img_stratagem/offensive/missle.png"]});
        break;
        case cmd.offensive.laser        : msg.channel.send(message.offensive.laser, {files: ["img_stratagem/offensive/orbital_laser.png"]});
        break;
        case cmd.offensive.railcannon   : msg.channel.send(message.offensive.railcannon, {files: ["img_stratagem/offensive/railcannon.png"]});
        break;
        case cmd.offensive.nuke         : msg.channel.send(message.offensive.nuke, {files: ["img_stratagem/offensive/shredder_missle.png"]});
        break;
        case cmd.offensive.precision    : msg.channel.send(message.offensive.precision, {files: ["img_stratagem/offensive/sledge_precision.png"]});
        break;
        case cmd.offensive.staticfield  : msg.channel.send(message.offensive.staticfield, {files: ["img_stratagem/offensive/static_field.png"]});
        break;
        case cmd.offensive.srun         : msg.channel.send(message.offensive.srun, {files: ["img_stratagem/offensive/strafing_run.png"]});
        break;
        case cmd.offensive.thunderer    : msg.channel.send(message.offensive.thunderer, {files: ["img_stratagem/offensive/thunderer.png"]});
        break;
    
    }
    
});

/*
|-----------------------------------------------------------------------------
| Helldivers Defensive Stratagem Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    switch(msg.content.toLowerCase()) {

        case cmd.defensive.at47 : msg.channel.send(message.defensive.at47, {files: ["img_stratagem/defensive/at47.png"]});
        break;
        case cmd.defensive.barrier : msg.channel.send(message.defensive.barrier, {files: ["img_stratagem/defensive/barrier.png"]});
        break;
        case cmd.defensive.beacon : msg.channel.send(message.defensive.beacon, {files: ["img_stratagem/defensive/beacon.png"]});
        break;
        case cmd.defensive.drone : msg.channel.send(message.defensive.drone, {files: ["img_stratagem/defensive/drone.png"]});
        break;
        case cmd.defensive.explosive_mine : msg.channel.send(message.defensive.explosive_mine, {files: ["img_stratagem/defensive/explosive_mine.png"]});
        break;
        case cmd.defensive.launcher_turret : msg.channel.send(message.defensive.launcher_turret, {files: ["img_stratagem/defensive/launcher_turret.png"]});
        break;
        case cmd.defensive.minigun_turret : msg.channel.send(message.defensive.minigun_turret, {files: ["img_stratagem/defensive/minigun_turret.png"]});
        break;
        case cmd.defensive.railcannon_turret : msg.channel.send(message.defensive.railcannon_turret, {files: ["img_stratagem/defensive/railcannon_turret.png"]});
        break;
        case cmd.defensive.smoke_round : msg.channel.send(message.defensive.smoke_round, {files: ["img_stratagem/defensive/smoke_round.png"]});
        break;
        case cmd.defensive.stun_mine : msg.channel.send(message.defensive.stun_mine, {files: ["img_stratagem/defensive/stun_mine.png"]});
        break;
        case cmd.defensive.tesla_tower : msg.channel.send(message.defensive.tesla_tower, {files: ["img_stratagem/defensive/tesla_tower.png"]});
        break;
        case cmd.defensive.turrets : msg.channel.send(message.defensive.turrets, {files:["img_stratagem/defensive/launcher_turret.png", "img_stratagem/defensive/minigun_turret.png", "img_stratagem/defensive/railcannon_turret.png"]});
        break;

    }

});

/*
|-----------------------------------------------------------------------------
| Helldivers Weapon Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    switch(msg.content.toLowerCase()) {
        case cmd.weapon.shotgun         : msg.channel.send({files: ["img_weapon/arc_shotgun.png"]});
        break;
        case cmd.weapon.thrower         : msg.channel.send({files: ["img_weapon/arc_thrower.png"]});
        break;
        case cmd.weapon.breaker         : msg.channel.send({files: ["img_weapon/breaker.png"]});
        break;
        case cmd.weapon.camper          : msg.channel.send({files: ["img_weapon/camper.png"]});
        break;
        case cmd.weapon.constitution    : msg.channel.send({files: ["img_weapon/constitution.png"]});
        break;
        case cmd.weapon.defender        : msg.channel.send({files: ["img_weapon/defender.png"]});
        break;
        case cmd.weapon.double_freedom  : msg.channel.send({files: ["img_weapon/double_freedom.png"]});
        break;
        case cmd.weapon.gunslinger      : msg.channel.send({files: ["img_weapon/gunslinger.png"]});
        break;
        case cmd.weapon.justice         : msg.channel.send({files: ["img_weapon/justice.png"]});
        break;
        case cmd.weapon.knight          : msg.channel.send({files: ["img_weapon/knight.png"]});
        break;
        case cmd.weapon.liberator       : msg.channel.send({files: ["img_weapon/liberator.png"]});
        break;
        case cmd.weapon.ninja           : msg.channel.send({files: ["img_weapon/ninja.png"]});
        break;
        case cmd.weapon.paragon         : msg.channel.send({files: ["img_weapon/paragon.png"]});
        break;
        case cmd.weapon.patriot         : msg.channel.send({files: ["img_weapon/patriot.png"]});
        break;
        case cmd.weapon.peacemaker      : msg.channel.send({files: ["img_weapon/peacemaker.png"]});
        break;
        case cmd.weapon.punisher        : msg.channel.send({files: ["img_weapon/punisher.png"]});
        break;
        case cmd.weapon.pyro            : msg.channel.send({files: ["img_weapon/pyro.png"]});
        break;
        case cmd.weapon.railgun         : msg.channel.send({files: ["img_weapon/railgun.png"]});
        break;
        case cmd.weapon.scorcher        : msg.channel.send({files: ["img_weapon/scorcher.png"]});
        break;
        case cmd.weapon.scythe          : msg.channel.send({files: ["img_weapon/scythe.png"]});
        break;
        case cmd.weapon.sickle          : msg.channel.send({files: ["img_weapon/sickle.png"]});
        break;
        case cmd.weapon.singe           : msg.channel.send({files: ["img_weapon/singe.png"]});
        break;
        case cmd.weapon.stalwart        : msg.channel.send({files: ["img_weapon/stalwart.png"]});
        break;
        case cmd.weapon.suppressor      : msg.channel.send({files: ["img_weapon/suppressor.png"]});
        break;
        case cmd.weapon.tanto           : msg.channel.send({files: ["img_weapon/tanto.png"]});
        break;
        case cmd.weapon.trident         : msg.channel.send({files: ["img_weapon/trident.png"]});
        break;
    }
});

/*
|-----------------------------------------------------------------------------
| Helldivers Special Stratagem Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    switch(msg.content.toLowerCase()) {
        case cmd.reinforce : msg.channel.send(message.special.reinforce);
        break;
        case cmd.sos       : msg.channel.send(message.special.sos);
        break;
        case cmd.trans     : msg.channel.send(message.objective.trans_1 + 
                                       message.objective.trans_2 + 
                                       message.objective.trans_3 + 
                                       message.objective.trans_4);
        break;
    }
});


// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'chat');
    if (!channel) return;
    channel.send(`Let's welcome ${member} to the server!!!`, {files: ["img_stratagem/offensive/shredder_missle.png"]});
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'ub-dev');
    if (!channel) return;
    channel.send(`Let's welcome ${member} to the server!`, {files: ["img_stratagem/offensive/shredder_missle.png"]});
});


// Prevent heroku from idling, send request to url every 5 minutes
setInterval(function() {
    https.get("https://u-b.herokuapp.com");
}, 300000);

// Log our bot in using the token
client.login(process.env.bot_token);