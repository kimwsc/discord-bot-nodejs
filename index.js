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


/*
|-----------------------------------------------------------------------------
| B.duck Stickers Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {
    
    switch(msg.content) {
        case cmd.bdangry        : msg.reply({files: ["stickers/bduck_angry.gif"]});
        break;
        case cmd.bdass          : msg.reply({files: ["stickers/bduck_ass.gif"]});
        break;
        case cmd.bdfaint        : msg.reply({files: ["stickers/bduck_faint.gif"]});
        break;
        case cmd.bdfull         : msg.reply({files: ["stickers/bduck_full.gif"]});
        break;
        case cmd.bdkeybord      : msg.reply({files: ["stickers/bduck_keybord.gif"]});
        break;
        case cmd.bdphone        : msg.reply({files: ["stickers/bduck_phone.gif"]});
        break;
        case cmd.bdplay         : msg.reply({files: ["stickers/bduck_play.gif"]});
        break;
        case cmd.bdlaugh        : msg.reply({files: ["stickers/bduck_laugh.gif"]});
        break;
        case cmd.bdbye          : msg.reply({files: ["stickers/bduck_bye.gif"]});
        break;
        case cmd.bddizzy        : msg.reply({files: ["stickers/bduck_dizzy.gif"]});
        break;
        case cmd.bdhello        : msg.reply({files: ["stickers/bduck_hello.gif"]});
        break;
        case cmd.bdlol          : msg.reply({files: ["stickers/bduck_lol.gif"]});
        break;
        case cmd.bdlove         : msg.reply({files: ["stickers/bduck_love.gif"]});
        break;
        case cmd.bdno           : msg.reply({files: ["stickers/bduck_no.gif"]});
        break;
        case cmd.bdnoodle       : msg.reply({files: ["stickers/bduck_noodle.gif"]});
        break;
        case cmd.bdok           : msg.reply({files: ["stickers/bduck_ok.gif"]});
        break;
        case cmd.bdomg          : msg.reply({files: ["stickers/bduck_omg.gif"]});
        break;
        case cmd.bdsad          : msg.reply({files: ["stickers/bduck_sad.gif"]});
        break;
        case cmd.bdsleep        : msg.reply({files: ["stickers/bduck_sleep.gif"]});
        break;
        case cmd.bdwoo          : msg.reply({files: ["stickers/bduck_woo.gif"]});
        break;
    }
});

/*
|-----------------------------------------------------------------------------
| Miscellaneous Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    switch(msg.content) {
        case cmd.middle_finger  : msg.reply({files: ["stickers/rick_and_morty_mf.gif"]});
        break;
        case cmd.fu             : msg.reply(message.ck);
        break;
        case cmd.ok             : msg.reply(message.ok);
        break;
        case cmd.kimsphere      : msg.reply(message.kimsphere);
        break;
        case cmd.andylam        : msg.reply(message.andylam);
        break;
        case cmd.asarind        : msg.reply(message.asarind);
        break;
        
    }

});

/*
|-----------------------------------------------------------------------------
| Helldivers Command List
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    switch(msg.content) {
        case "/helldivers" : msg.reply("Here are all available Helldivers Commands: \n" + 
                                        "prefix: `/` \n" +
                                        "❯ Ofensive Stratagems \n" + 
                                        "`airstrike` | " +
                                        "`closeair` | " +
                                        "`divebomb` | " +
                                        "`hsrun` | " +
                                        "`incendiary` | " +
                                        "`missle` | " +
                                        "`laser` | " +
                                        "`railcannon` | " +
                                        "`nuke` | " +
                                        "`precision` | " +
                                        "`staticfield` | " +
                                        "`srun` | " +
                                        "`thunderer` | \n" +
                                        "❯ Defensive Stratagems \n" + 
                                        "`at47` | " +
                                        "`barrier` | " +
                                        "`beacon` | " +
                                        "`drone` | " +
                                        "`mine` | " +
                                        "`turret launcher` | " +
                                        "`turret minigun` | " +
                                        "`turret railcannon` | " +
                                        "`smokeround` | " +
                                        "`stunmine` | " +
                                        "`tesla` | " +
                                        "`turrets` | \n" +
                                        "❯ Weapon \n" +
                                        "`shotgun` | " +
                                        "`thrower` | " +
                                        "`breaker` | " +
                                        "`camper` | " +
                                        "`constitution` | " +
                                        "`defender` | " +
                                        "`doublefreedom` | " +
                                        "`gunslinger` | " +
                                        "`justice` | " +
                                        "`knight` | " +
                                        "`liberator` | " +
                                        "`ninja` | " +
                                        "`paragon` | " +
                                        "`patriot` | " +
                                        "`peacemaker` | " +
                                        "`punisher` | " +
                                        "`pyro` | " +
                                        "`railgun` | " +
                                        "`scorcher` | " +
                                        "`scythe` | " +
                                        "`sickle` | " +
                                        "`singe` | " +
                                        "`stalwart` | " +
                                        "`suppressor` | " +
                                        "`tanto` | " +
                                        "`trident` | \n" +
                                        "❯ Special Stratagems \n" +
                                        "`reinforce` | " +
                                        "`sos` | " +
                                        "`offensive` | \n" +
                                        "❯ Transmitter Objective Key \n" +
                                        "`trans` | "
    
        );
        break;
    }

});

/*
|-----------------------------------------------------------------------------
| Helldivers Offensive Stratagem Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {
    
    switch(msg.content) {
        case cmd.offensive.airstrike    : msg.reply(message.offensive.airstrike, {files: ["img_stratagem/offensive/airstrike.png"]});
        break;
        case cmd.offensive.closeair     : msg.reply(message.offensive.closeair, {files: ["img_stratagem/offensive/close_air.png"]});
        break;
        case cmd.offensive.divebomb     : msg.reply(message.offensive.divebomb, {files: ["img_stratagem/offensive/dive_bomb.png"]});
        break;
        case cmd.offensive.hsrun        : msg.reply(message.offensive.hsrun, {files: ["img_stratagem/offensive/heavy_strafing_run.png"]});
        break;
        case cmd.offensive.incendiary   : msg.reply(message.offensive.incendiary, {files: ["img_stratagem/offensive/incendiary.png"]});
        break;
        case cmd.offensive.missle       : msg.reply(message.offensive.missle, {files: ["img_stratagem/offensive/missle.png"]});
        break;
        case cmd.offensive.laser        : msg.reply(message.offensive.laser, {files: ["img_stratagem/offensive/orbital_laser.png"]});
        break;
        case cmd.offensive.railcannon   : msg.reply(message.offensive.railcannon, {files: ["img_stratagem/offensive/railcannon.png"]});
        break;
        case cmd.offensive.nuke         : msg.reply(message.offensive.nuke, {files: ["img_stratagem/offensive/shredder_missle.png"]});
        break;
        case cmd.offensive.precision    : msg.reply(message.offensive.precision, {files: ["img_stratagem/offensive/sledge_precision.png"]});
        break;
        case cmd.offensive.staticfield  : msg.reply(message.offensive.staticfield, {files: ["img_stratagem/offensive/static_field.png"]});
        break;
        case cmd.offensive.srun         : msg.reply(message.offensive.srun, {files: ["img_stratagem/offensive/strafing_run.png"]});
        break;
        case cmd.offensive.thunderer    : msg.reply(message.offensive.thunderer, {files: ["img_stratagem/offensive/thunderer.png"]});
        break;
    
    }
    
});

/*
|-----------------------------------------------------------------------------
| Helldivers Defensive Stratagem Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    switch(msg.content) {

        case cmd.defensive.at47 : msg.reply(message.defensive.at47, {files: ["img_stratagem/defensive/at47.png"]});
        break;
        case cmd.defensive.barrier : msg.reply(message.defensive.barrier, {files: ["img_stratagem/defensive/barrier.png"]});
        break;
        case cmd.defensive.beacon : msg.reply(message.defensive.beacon, {files: ["img_stratagem/defensive/beacon.png"]});
        break;
        case cmd.defensive.drone : msg.reply(message.defensive.drone, {files: ["img_stratagem/defensive/drone.png"]});
        break;
        case cmd.defensive.explosive_mine : msg.reply(message.defensive.explosive_mine, {files: ["img_stratagem/defensive/explosive_mine.png"]});
        break;
        case cmd.defensive.launcher_turret : msg.reply(message.defensive.launcher_turret, {files: ["img_stratagem/defensive/launcher_turret.png"]});
        break;
        case cmd.defensive.minigun_turret : msg.reply(message.defensive.minigun_turret, {files: ["img_stratagem/defensive/minigun_turret.png"]});
        break;
        case cmd.defensive.railcannon_turret : msg.reply(message.defensive.railcannon_turret, {files: ["img_stratagem/defensive/railcannon_turret.png"]});
        break;
        case cmd.defensive.smoke_round : msg.reply(message.defensive.smoke_round, {files: ["img_stratagem/defensive/smoke_round.png"]});
        break;
        case cmd.defensive.stun_mine : msg.reply(message.defensive.stun_mine, {files: ["img_stratagem/defensive/stun_mine.png"]});
        break;
        case cmd.defensive.tesla_tower : msg.reply(message.defensive.tesla_tower, {files: ["img_stratagem/defensive/tesla_tower.png"]});
        break;
        case cmd.defensive.turrets : msg.reply(message.defensive.turrets, {files:["img_stratagem/defensive/launcher_turret.png", "img_stratagem/defensive/minigun_turret.png", "img_stratagem/defensive/railcannon_turret.png"]});
        break;

    }

});

/*
|-----------------------------------------------------------------------------
| Helldivers Weapon Commands
|-----------------------------------------------------------------------------
*/

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

/*
|-----------------------------------------------------------------------------
| Helldivers Special Stratagem Commands
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {

    switch(msg.content) {
        case cmd.reinforce : msg.reply(message.special.reinforce);
        break;
        case cmd.sos       : msg.reply(message.special.sos);
        break;
        case cmd.trans     : msg.reply(message.objective.trans_1 + 
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