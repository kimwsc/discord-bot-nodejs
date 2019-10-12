const express     = require('express');
const app         = express();
const keepAlive   = express();
const fs          = require('fs');
const Discord     = require('discord.js');
const path        = require('path');
const client      = new Discord.Client();
const keepalive   = require('express-glitch-keepalive');
const flatten     = require('flat');
const contentful  = require('contentful-management');

let https       = require("https");
let jsonMessage = fs.readFileSync('message.json');
let jsonCommand = fs.readFileSync('command.json');

let message     = JSON.parse(jsonMessage);
let command     = JSON.parse(jsonCommand);
let flattenCmd  = flatten({command});

keepAlive.use(keepalive);

app.use(express.static('public'));
 
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/commands', (request, response) => {
  response.sendFile(__dirname + '/views/command.html');
});

app.get('/json', function(request, response) {
  response.send(flattenCmd);
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


client.on('ready', () => {
  
    client.user.setActivity('/help', {type: 'LISTENING'});
    console.log(`Logged in as ${client.user.tag}!`);
    // const channel = client.channels.find(ch => ch.name === 'hisako🌐');
    // channel.send(":new: Command \nYou're now able to delete lists from Hisako's personal bucket by using `/list del` command");
  
});
  
var contentfulClient = contentful.createClient({
  accessToken: process.env.CONTENTFUL_APIKEY
})

/*
|-----------------------------------------------------------------------------
| /list Command
|-----------------------------------------------------------------------------
*/

client.on('message', (receivedMessage) => {
  
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }
  
    if (receivedMessage.content.startsWith("/list")) {
        processCommand(receivedMessage);
    }

  
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(5); // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[1]; // The first word directly after the exclamation is the command
    let cmdArguments = splitCommand.slice(2).join(" "); // All other words are cmdArguments/parameters/options for the command

    console.log("Command received: " + primaryCommand);
    console.log("Arguments: " + cmdArguments); // There may not be any cmdArguments

    var id = 1;

    function setId (entry) {
      var setEntryWithId = id++ +". " + entry;
      return setEntryWithId;
    }
  
    if (primaryCommand == "add") {
                  
      if (cmdArguments.length < 1){
        receivedMessage.channel.send(":x: Empty input, please try `list add` [ text ]");
      } else if (cmdArguments.length > 200) {
        receivedMessage.channel.send(":x: 太長氣 \n Maximum `200` characters in one list.");
      }
      else {
          contentfulClient.getSpace(process.env.SPACE_ID)
            .then((space) => space.getEnvironment('master'))
            .then((environment) => environment.getEntry(process.env.MESSAGE_LIST_ENTRY_ID))
            .then((entry) => {

            var allEntry = entry.fields.list['en-US'].msg;

            allEntry.push(receivedMessage.author.username +" :thought_balloon:  "+ cmdArguments.trim());
            entry.fields.list['en-US'].msg = allEntry;

            return entry.update()

          })
          .catch(console.error)

          receivedMessage.channel.send(":white_check_mark: List has been added. Use `/list all` command to check the list")
  
     }
    }
    else if (primaryCommand == "del") {
                  
      if(cmdArguments.length < 1){
        receivedMessage.channel.send(":x: Please try `list del` [ number ]");
      } 
      else {
        contentfulClient.getSpace(process.env.SPACE_ID)
          .then((space) => space.getEnvironment('master'))
          .then((environment) => environment.getEntry(process.env.MESSAGE_LIST_ENTRY_ID))
          .then((entry) => {

          var allEntry = entry.fields.list['en-US'].msg;

          if (cmdArguments <= 0 || cmdArguments > allEntry.length)
          {
            receivedMessage.channel.send(":x: Trying to delete something not in the list? LMAO!");
          } 
          else {
            var entryIndex = cmdArguments-1;

            allEntry.splice(entryIndex, 1);
            entry.fields.list['en-US'].msg = allEntry;
            
            receivedMessage.channel.send(":white_check_mark: List number `"+ cmdArguments +"` has been deleted. Use `/list all` command to check the list")
            
            return entry.update()
          }
        })
        .catch(console.error)
        
     }
    }
  
    // List page 1
    else if (primaryCommand == "all" || primaryCommand == "all1") {
      contentfulClient.getSpace(process.env.SPACE_ID)
        .then((space) => space.getEnvironment('master'))
        .then((environment) => environment.getEntry(process.env.MESSAGE_LIST_ENTRY_ID))
        .then((entry) => {
        
          var allEntry = entry.fields.list['en-US'].msg;
          var entryWithId = allEntry.map(setId);
                  
          if (allEntry === undefined || allEntry.length == 0) {
            receivedMessage.channel.send(":x: Bucket is empty.");
          } 
          else {            
              const allListEmbed = new Discord.RichEmbed()
              .setColor('#fafafa')
              .attachFile('img_misc/bucket.png')
              .setAuthor("Hisako's Personal Bucket", 'attachment://bucket.png')
              .setDescription('A bucket list to keep some notes for you')
              .addField("❯ Page 1", entryWithId.slice(0, 15).join("\n"), true)
              .setTimestamp()
              .setFooter('Hisako');

              receivedMessage.channel.send(allListEmbed);

          }
      })
      .catch(console.error)
    } 
        
      // List page 2
      else if (primaryCommand == "all2") {
        contentfulClient.getSpace(process.env.SPACE_ID)
          .then((space) => space.getEnvironment('master'))
          .then((environment) => environment.getEntry(process.env.MESSAGE_LIST_ENTRY_ID))
          .then((entry) => {

            var allEntry = entry.fields.list['en-US'].msg;
            var entryWithId = allEntry.map(setId);

            if(allEntry.length < 15) {
              receivedMessage.channel.send(":x: There's no page 2! LMAO");
            }
            else {

                const allListEmbed = new Discord.RichEmbed()
                .setColor('#fafafa')
                .attachFile('img_misc/bucket.png')
                .setAuthor("Hisako's Personal Bucket", 'attachment://bucket.png')
                .setDescription('A bucket list to keep some notes for you')
                .addField("❯ Page 2", entryWithId.slice(15).join("\n"), true)
                .setTimestamp()
                .setFooter('Hisako');

                receivedMessage.channel.send(allListEmbed);

            }
        })
        .catch(console.error)
      
    }
    else {
        const listEmbed = new Discord.RichEmbed()
        .setColor('#fafafa')
        .attachFile('img_misc/bucket.png')
        .setAuthor("Hisako's Personal Bucket", 'attachment://bucket.png')
        .setDescription('Command Prefix : `/`')
        .addField('❯ Personal Bucket List', "`list add` | `list all`", true)
        .setTimestamp()
        .setFooter('Hisako');

        receivedMessage.channel.send(listEmbed);
    }
  
}

});

/*
|-----------------------------------------------------------------------------
| /help Command
|-----------------------------------------------------------------------------
*/

client.on('message', msg => {
        
    // Prevent bot from responding to its own messages
    if (msg.author == client.user) {
        return
    }

    var msgContent  = msg.content.toLowerCase();
    var bduckStickerPath = "stickers/bduck_";
    var prefix = "/";
    var commandList = [];
    var cmd = '';
    var timezoneAsia = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"});
    var datetimeAsia = new Date(timezoneAsia);
    var hours = datetimeAsia.getHours();
    var minutes = datetimeAsia.getMinutes();
    var kimsphereId = process.env.KIMSPHERE_ID
      
    if (hours >= 23 || hours <= 7) {
      if (msg.isMentioned(kimsphereId)) {
        
        hours = hours % 12; // Use modulus operator to get remainder of hours-12
        hours = hours ? hours : 12; // conditon, when the remainder is '0', should be '12'
        var ampm = hours >= 12 ? 'PM' : 'AM';
        
        msg.reply(" `(GMT+8) "+hours+":"+minutes+" "+ampm+ "`  Kim is sleeping like a DEAD now :joy:");
      }
    }
  
    // Bot auto reply
//     if (msg.isMentioned(kimsphereId))
//     {
//       msg.reply("`(GMT+8) "+hours+":"+minutes+" "+ampm+ "` Kim is having lunch :joy:");
//     }

  
    if (msgContent == prefix+command.help) {
        
        const helpCommandEmbed = new Discord.RichEmbed()
        .setColor('#fbb3ff')
        .attachFile('img_misc/hisako.jpg')
        .setAuthor("Hi, I'm Hisako, how can I help you?", 'attachment://hisako.jpg')
        .setDescription('Command Prefix : `/`')
        .setThumbnail('attachment://hisako.jpg')
        .addField('❯ B.Duck Stickers', '`bduck`', true)
        .addField('❯ Intense Cat Stickers', '`icat`', true)
        .addField('❯ HELLDIVERS™', '`hd`', true)
        .addField('❯ Portal Knights Wiki', '`pk`', true)
        .addField('❯ Personal bucket list', '`list`', true)
        .addField('❯ Miscellaneous', '`misc`', true)
        .setTimestamp()
        .setFooter('Hisako');

        msg.channel.send(helpCommandEmbed);
    }

/*
|-----------------------------------------------------------------------------
| B.duck Stickers Command List
|-----------------------------------------------------------------------------
*/

    if (msgContent === prefix+command.help_bduck) {
                    
        for (cmd in command.bduck) {
          commandList.push("`"+command.bduck[cmd]+"` | ");
        }
      
        const bduckEmbed = new Discord.RichEmbed()
        .setColor('#ffd321')
        .setAuthor('B.Duck', 'https://cdn.glitch.com/57f834b4-edf0-4a1e-87fa-b3b6ed3b8dcf%2Fbd_yes.gif?v=1569554599171')
        .setDescription('No prefix')
        .setThumbnail('https://cdn.streamelements.com/uploads/33f405cc-22ce-45a8-9f92-a01efedb5b62.gif')
        .addField('❯ Available stickers', commandList.join(" "), true)
        .setTimestamp()
        .setFooter('Hisako');
    
        msg.channel.send(bduckEmbed);
   
    }

/*
|-----------------------------------------------------------------------------
| B.duck Stickers Commands
|-----------------------------------------------------------------------------
*/    
    switch(msgContent) {
        case command.bduck.angry        : msg.channel.send({files: [bduckStickerPath+"angry.gif"]});
        break;
        case command.bduck.ass          : msg.channel.send({files: [bduckStickerPath+"ass.gif"]});
        break;
        case command.bduck.faint        : msg.channel.send({files: [bduckStickerPath+"faint.gif"]});
        break;
        case command.bduck.full         : msg.channel.send({files: [bduckStickerPath+"full.gif"]});
        break;
        case command.bduck.keyboard     : msg.channel.send({files: [bduckStickerPath+"keyboard.gif"]});
        break;
        case command.bduck.phone        : msg.channel.send({files: [bduckStickerPath+"phone.gif"]});
        break;
        case command.bduck.play         : msg.channel.send({files: [bduckStickerPath+"play.gif"]});
        break;
        case command.bduck.laugh        : msg.channel.send({files: [bduckStickerPath+"laugh.gif"]});
        break;
        case command.bduck.bye          : msg.channel.send({files: [bduckStickerPath+"bye.gif"]});
        break;
        case command.bduck.dizzy        : msg.channel.send({files: [bduckStickerPath+"dizzy.gif"]});
        break;
        case command.bduck.hello        : msg.channel.send({files: [bduckStickerPath+"hello.gif"]});
        break;
        case command.bduck.lol          : msg.channel.send({files: [bduckStickerPath+"lol.gif"]});
        break;
        case command.bduck.love         : msg.channel.send({files: [bduckStickerPath+"love.gif"]});
        break;
        case command.bduck.no           : msg.channel.send({files: [bduckStickerPath+"no.gif"]});
        break;
        case command.bduck.noodle       : msg.channel.send({files: [bduckStickerPath+"noodle.gif"]});
        break;
        case command.bduck.ok           : msg.channel.send({files: [bduckStickerPath+"ok.gif"]});
        break;
        case command.bduck.omg          : msg.channel.send({files: [bduckStickerPath+"omg.gif"]});
        break;
        case command.bduck.sad          : msg.channel.send({files: [bduckStickerPath+"sad.gif"]});
        break;
        case command.bduck.sleep        : msg.channel.send({files: [bduckStickerPath+"sleep.gif"]});
        break;
        case command.bduck.woo          : msg.channel.send({files: [bduckStickerPath+"woo.gif"]});
        break;
    }

/*
|-----------------------------------------------------------------------------
| Miscellaneous Commands
|-----------------------------------------------------------------------------
*/

    if (msgContent === prefix+command.help_misc) {
      
        for (cmd in command.misc) {
          commandList.push("`"+command.misc[cmd]+"` | ");
        }
        
        const miscEmbed = new Discord.RichEmbed()
        .setColor('#fafafa')
        .attachFile('img_misc/hisako.jpg')
        .setAuthor('MISC', 'attachment://hisako.jpg')
        .setDescription('Here are some MISC commands')
        .addField('❯ Miscellaneous', commandList.join(" "), true)
        .setTimestamp()
        .setFooter('Hisako');

        msg.channel.send(miscEmbed);
    }


    switch(msgContent) {
        case command.misc.middle_finger     : msg.channel.send({files: ["stickers/rick_and_morty_mf.gif"]});
        break;
        case command.misc.cqface            : msg.channel.send({files: ["stickers/cqface.gif"]});
        break;
        case command.misc.avo               : msg.channel.send({files: ["stickers/avo.gif"]});
        break;
        case command.misc.beesting          : msg.channel.send({files: ["stickers/beesting.gif"]});
        break;
        case command.misc.crase             : msg.channel.send({files: ["stickers/crase.gif"]});
        break;
        case command.misc.foxydance         : msg.channel.send({files: ["stickers/foxydance.gif"]});
        break;
        case command.misc.kuatcat           : msg.channel.send({files: ["stickers/kuatcat.gif"]});
        break;
        case command.misc.patrick           : msg.channel.send({files: ["stickers/patrick.gif"]});
        break;
        case command.misc.rainbowcat        : msg.channel.send({files: ["stickers/rainbowcat.gif"]});
        break;
        case command.misc.shtd              : msg.channel.send({files: ["stickers/shtd.gif"]});
        break;
        case command.misc.twita             : msg.channel.send({files: ["stickers/twita.gif"]});
        break;
        case command.misc.walkthekid        : msg.channel.send({files: ["stickers/walkthekid.gif"]});
        break;
        case command.misc.fu                : msg.channel.send(message.ck);
        break;
        case command.misc.ok                : msg.channel.send(message.ok);
        break;
        case command.misc.kimsphere         : msg.channel.send(message.kimsphere);
        break;
        case command.misc.andylam           : msg.channel.send(message.andylam);
        break;
        case command.misc.asarind           : msg.channel.send(message.asarind);
        break;
        
    }

/*
|-----------------------------------------------------------------------------
| Helldivers Command List
|-----------------------------------------------------------------------------
*/

    if (msgContent === prefix+command.help_helldivers) {
        
        var offensive   = [];
        var defensive   = [];
        var weapon      = [];
        var special     = [];
      
        for (cmd in command.hd.offensive) {
          offensive.push("`"+command.hd.offensive[cmd]+"` | ");
        }
        for (cmd in command.hd.defensive) {
          defensive.push("`"+command.hd.defensive[cmd]+"` | ");
        }
        for (cmd in command.hd.weapon) {
          weapon.push("`"+command.hd.weapon[cmd]+"` | ");
        }
        for (cmd in command.hd.special) {
          special.push("`"+command.hd.special[cmd]+"` | ");
        }
      
        const helldiversEmbed = new Discord.RichEmbed()
        .setColor('#d4d4d4')
        .setAuthor('HELLDIVERS™', 'https://steamuserimages-a.akamaihd.net/ugc/88224496145598035/E12BE9A061F526B4898A69E81B26D19148525FC3/','https://helldivers.gamepedia.com/Stratagems')
        .setDescription('Command Prefix : `/`')
        .setThumbnail('https://steamuserimages-a.akamaihd.net/ugc/88224496145598035/E12BE9A061F526B4898A69E81B26D19148525FC3/')
        .addField('❯ Offensive Stratagems', offensive.join(" "), true)
        .addField('❯ Defensive Stratagems', defensive.join(" "), true)
        .addField('❯ Weapons', weapon.join(" "), true)
        .addField('❯ Special Stratagems', special.join(" "), true)
        .addField('❯ Transmitter Objective Key','`trans`',true)
        .setTimestamp()
        .setFooter('Hisako');

        msg.channel.send(helldiversEmbed);
    }

/*
|-----------------------------------------------------------------------------
| Helldivers Offensive Stratagem Commands
|-----------------------------------------------------------------------------
*/
    
    switch(msgContent) {
        case prefix+command.hd.offensive.airstrike    : msg.channel.send(message.offensive.airstrike, {files: ["img_stratagem/offensive/airstrike.png"]});
        break;
        case prefix+command.hd.offensive.closeair     : msg.channel.send(message.offensive.closeair, {files: ["img_stratagem/offensive/close_air.png"]});
        break;
        case prefix+command.hd.offensive.divebomb     : msg.channel.send(message.offensive.divebomb, {files: ["img_stratagem/offensive/dive_bomb.png"]});
        break;
        case prefix+command.hd.offensive.hsrun        : msg.channel.send(message.offensive.hsrun, {files: ["img_stratagem/offensive/heavy_strafing_run.png"]});
        break;
        case prefix+command.hd.offensive.incendiary   : msg.channel.send(message.offensive.incendiary, {files: ["img_stratagem/offensive/incendiary.png"]});
        break;
        case prefix+command.hd.offensive.missle       : msg.channel.send(message.offensive.missle, {files: ["img_stratagem/offensive/missle.png"]});
        break;
        case prefix+command.hd.offensive.laser        : msg.channel.send(message.offensive.laser, {files: ["img_stratagem/offensive/orbital_laser.png"]});
        break;
        case prefix+command.hd.offensive.railcannon   : msg.channel.send(message.offensive.railcannon, {files: ["img_stratagem/offensive/railcannon.png"]});
        break;
        case prefix+command.hd.offensive.nuke         : msg.channel.send(message.offensive.nuke, {files: ["img_stratagem/offensive/shredder_missle.png"]});
        break;
        case prefix+command.hd.offensive.precision    : msg.channel.send(message.offensive.precision, {files: ["img_stratagem/offensive/sledge_precision.png"]});
        break;
        case prefix+command.hd.offensive.staticfield  : msg.channel.send(message.offensive.staticfield, {files: ["img_stratagem/offensive/static_field.png"]});
        break;
        case prefix+command.hd.offensive.srun         : msg.channel.send(message.offensive.srun, {files: ["img_stratagem/offensive/strafing_run.png"]});
        break;
        case prefix+command.hd.offensive.thunderer    : msg.channel.send(message.offensive.thunderer, {files: ["img_stratagem/offensive/thunderer.png"]});
        break;
    
    }
    
/*
|-----------------------------------------------------------------------------
| Helldivers Defensive Stratagem Commands
|-----------------------------------------------------------------------------
*/

    switch(msgContent) {

        case prefix+command.hd.defensive.at47 : msg.channel.send(message.defensive.at47, {files: ["img_stratagem/defensive/at47.png"]});
        break;
        case prefix+command.hd.defensive.barrier : msg.channel.send(message.defensive.barrier, {files: ["img_stratagem/defensive/barrier.png"]});
        break;
        case prefix+command.hd.defensive.beacon : msg.channel.send(message.defensive.beacon, {files: ["img_stratagem/defensive/beacon.png"]});
        break;
        case prefix+command.hd.defensive.drone : msg.channel.send(message.defensive.drone, {files: ["img_stratagem/defensive/drone.png"]});
        break;
        case prefix+command.hd.defensive.explosive_mine : msg.channel.send(message.defensive.explosive_mine, {files: ["img_stratagem/defensive/explosive_mine.png"]});
        break;
        case prefix+command.hd.defensive.launcher_turret : msg.channel.send(message.defensive.launcher_turret, {files: ["img_stratagem/defensive/launcher_turret.png"]});
        break;
        case prefix+command.hd.defensive.minigun_turret : msg.channel.send(message.defensive.minigun_turret, {files: ["img_stratagem/defensive/minigun_turret.png"]});
        break;
        case prefix+command.hd.defensive.railcannon_turret : msg.channel.send(message.defensive.railcannon_turret, {files: ["img_stratagem/defensive/railcannon_turret.png"]});
        break;
        case prefix+command.hd.defensive.smoke_round : msg.channel.send(message.defensive.smoke_round, {files: ["img_stratagem/defensive/smoke_round.png"]});
        break;
        case prefix+command.hd.defensive.stun_mine : msg.channel.send(message.defensive.stun_mine, {files: ["img_stratagem/defensive/stun_mine.png"]});
        break;
        case prefix+command.hd.defensive.tesla_tower : msg.channel.send(message.defensive.tesla_tower, {files: ["img_stratagem/defensive/tesla_tower.png"]});
        break;
        case prefix+command.hd.defensive.turrets : msg.channel.send(message.defensive.turrets, {files:["img_stratagem/defensive/launcher_turret.png", "img_stratagem/defensive/minigun_turret.png", "img_stratagem/defensive/railcannon_turret.png"]});
        break;

    }

/*
|-----------------------------------------------------------------------------
| Helldivers Weapon Commands
|-----------------------------------------------------------------------------
*/

    switch(msgContent) {
        case prefix+command.hd.weapon.shotgun         : msg.channel.send({files: ["img_weapon/arc_shotgun.png"]});
        break;
        case prefix+command.hd.weapon.thrower         : msg.channel.send({files: ["img_weapon/arc_thrower.png"]});
        break;
        case prefix+command.hd.weapon.breaker         : msg.channel.send({files: ["img_weapon/breaker.png"]});
        break;
        case prefix+command.hd.weapon.camper          : msg.channel.send({files: ["img_weapon/camper.png"]});
        break;
        case prefix+command.hd.weapon.constitution    : msg.channel.send({files: ["img_weapon/constitution.png"]});
        break;
        case prefix+command.hd.weapon.defender        : msg.channel.send({files: ["img_weapon/defender.png"]});
        break;
        case prefix+command.hd.weapon.double_freedom  : msg.channel.send({files: ["img_weapon/double_freedom.png"]});
        break;
        case prefix+command.hd.weapon.gunslinger      : msg.channel.send({files: ["img_weapon/gunslinger.png"]});
        break;
        case prefix+command.hd.weapon.justice         : msg.channel.send({files: ["img_weapon/justice.png"]});
        break;
        case prefix+command.hd.weapon.knight          : msg.channel.send({files: ["img_weapon/knight.png"]});
        break;
        case prefix+command.hd.weapon.liberator       : msg.channel.send({files: ["img_weapon/liberator.png"]});
        break;
        case prefix+command.hd.weapon.ninja           : msg.channel.send({files: ["img_weapon/ninja.png"]});
        break;
        case prefix+command.hd.weapon.paragon         : msg.channel.send({files: ["img_weapon/paragon.png"]});
        break;
        case prefix+command.hd.weapon.patriot         : msg.channel.send({files: ["img_weapon/patriot.png"]});
        break;
        case prefix+command.hd.weapon.peacemaker      : msg.channel.send({files: ["img_weapon/peacemaker.png"]});
        break;
        case prefix+command.hd.weapon.punisher        : msg.channel.send({files: ["img_weapon/punisher.png"]});
        break;
        case prefix+command.hd.weapon.pyro            : msg.channel.send({files: ["img_weapon/pyro.png"]});
        break;
        case prefix+command.hd.weapon.railgun         : msg.channel.send({files: ["img_weapon/railgun.png"]});
        break;
        case prefix+command.hd.weapon.scorcher        : msg.channel.send({files: ["img_weapon/scorcher.png"]});
        break;
        case prefix+command.hd.weapon.scythe          : msg.channel.send({files: ["img_weapon/scythe.png"]});
        break;
        case prefix+command.hd.weapon.sickle          : msg.channel.send({files: ["img_weapon/sickle.png"]});
        break;
        case prefix+command.hd.weapon.singe           : msg.channel.send({files: ["img_weapon/singe.png"]});
        break;
        case prefix+command.hd.weapon.stalwart        : msg.channel.send({files: ["img_weapon/stalwart.png"]});
        break;
        case prefix+command.hd.weapon.suppressor      : msg.channel.send({files: ["img_weapon/suppressor.png"]});
        break;
        case prefix+command.hd.weapon.tanto           : msg.channel.send({files: ["img_weapon/tanto.png"]});
        break;
        case prefix+command.hd.weapon.trident         : msg.channel.send({files: ["img_weapon/trident.png"]});
        break;
    }

/*
|-----------------------------------------------------------------------------
| Helldivers Special Stratagem Commands
|-----------------------------------------------------------------------------
*/

    switch(msgContent) {
        case prefix+command.hd.special.reinforce : msg.channel.send(message.special.reinforce, {files: ["img_stratagem/special/reinforce.png"]});
        break;
        case prefix+command.hd.special.sos       : msg.channel.send(message.special.sos, {files: ["img_stratagem/special/beacon.png"]});
        break;
        // case command.hellbomb  : msg.channel.send(message.special.hellbomb, {files: ["img_stratagem/special/hellbomb.png"]});
        // break;
        // case command.sniffer   : msg.channel.send(message.special.sniffer, {files: ["img_stratagem/special/sniffer.png"]});
        // break;
        case prefix+command.hd.trans     : msg.channel.send(message.objective.trans_1 + 
                                       message.objective.trans_2 + 
                                       message.objective.trans_3 + 
                                       message.objective.trans_4);
        break;
    }

/*
|-----------------------------------------------------------------------------
| Portal Knights Commands
|-----------------------------------------------------------------------------
*/
    
    if (msgContent === prefix+command.help_portalknights) {
        
        const helpCommandEmbed = new Discord.RichEmbed()
        .setColor('#6583fc')
        .attachFile('img_misc/portal_knights.png')
        .setAuthor("Portal Knights", 'attachment://hisako.jpg')
        .setDescription('Command Prefix : `pk`')
        .setThumbnail('attachment://portal_knights.png')
        .addField('❯ Wiki', '`weapons` | `armor` | `blocks` | `ingredients` | `portal` | `crafting` | `tools` | `skills` | `consume` | `recipes` | `pets` | `events` | `islands` | `misc` | `bosses`', true)
        .setTimestamp()
        .setFooter('Hisako');

        msg.channel.send(helpCommandEmbed);
    }

    switch (msgContent) {

        case "pk weapons"     : msg.channel.send("https://portalknights.gamepedia.com/Weapons");
        break;
        case "pk armor"       : msg.channel.send("https://portalknights.gamepedia.com/Armor");
        break;
        case "pk blocks"      : msg.channel.send("https://portalknights.gamepedia.com/Blocks");
        break;
        case "pk ingredients" : msg.channel.send("https://portalknights.gamepedia.com/Ingredients");
        break;
        case "pk portal"      : msg.channel.send("https://portalknights.gamepedia.com/Portal_Stones");
        break;
        case "pk crafting"    : msg.channel.send("https://portalknights.gamepedia.com/Crafting_Stations");
        break;
        case "pk tools"       : msg.channel.send("https://portalknights.gamepedia.com/Tools");
        break;
        case "pk skills"      : msg.channel.send("https://portalknights.gamepedia.com/Skills");
        break;
        case "pk consume"     : msg.channel.send("https://portalknights.gamepedia.com/Consumables");
        break;
        case "pk misc"        : msg.channel.send("https://portalknights.gamepedia.com/Misc");
        break;
        case "pk recipes"     : msg.channel.send("https://portalknights.gamepedia.com/Recipes");
        break;
        case "pk pets"        : msg.channel.send("https://portalknights.gamepedia.com/Pets");
        break;
        case "pk events"      : msg.channel.send("https://portalknights.gamepedia.com/Events");
        break;
        case "pk islands"     : msg.channel.send("https://portalknights.gamepedia.com/Islands");
        break;
        case "pk npc"         : msg.channel.send("https://portalknights.gamepedia.com/NPCs");
        break;
        case "pk bosses"      : msg.channel.send("https://portalknights.gamepedia.com/Bosses");
        break;
    }


  
/*
|-----------------------------------------------------------------------------
| Intense Cat Stickers Command List
|-----------------------------------------------------------------------------
*/

    if (msgContent === prefix+command.help_icat) {
                    
        for (cmd in command.intensecat) {
          commandList.push("`"+command.intensecat[cmd]+"` | ");
        }
      
        const iCatEmbed = new Discord.RichEmbed()
        .setColor('#fafafa')
        .attachFile('stickers_intensecat/evil1.gif')
        .setAuthor('Intense Cat', 'attachment://evil1.gif')
        .setDescription('Command Prefix : `ic`')
        .setThumbnail('attachment://evil1.gif')
        .addField('❯ Available stickers', commandList.join(" "), true)
        .setTimestamp()
        .setFooter('Hisako');
    
        msg.channel.send(iCatEmbed);
   
    }
    var cmdPrefix = "ic ";
    var iCatStickerPath = "stickers_intensecat/";
  
    switch(msgContent) {
      case cmdPrefix+command.intensecat.cat1212     : msg.channel.send({files: [iCatStickerPath+"1212.gif"]});
      break;
      case cmdPrefix+command.intensecat.andy        : msg.channel.send({files: [iCatStickerPath+"andy.gif"]});
      break;
      case cmdPrefix+command.intensecat.angry1      : msg.channel.send({files: [iCatStickerPath+"angry1.gif"]});
      break;
      case cmdPrefix+command.intensecat.angry2      : msg.channel.send({files: [iCatStickerPath+"angry2.gif"]});
      break;
      case cmdPrefix+command.intensecat.ruok        : msg.channel.send({files: [iCatStickerPath+"ruok.gif"]});
      break;
      case cmdPrefix+command.intensecat.bad         : msg.channel.send({files: [iCatStickerPath+"bad.gif"]});
      break;
      case cmdPrefix+command.intensecat.busy        : msg.channel.send({files: [iCatStickerPath+"busy.gif"]});
      break;
      case cmdPrefix+command.intensecat.cheerup     : msg.channel.send({files: [iCatStickerPath+"cheerup.gif"]});
      break;
      case cmdPrefix+command.intensecat.dead        : msg.channel.send({files: [iCatStickerPath+"dead.gif"]});
      break;
      case cmdPrefix+command.intensecat.deal        : msg.channel.send({files: [iCatStickerPath+"deal.gif"]});
      break;
      case cmdPrefix+command.intensecat.dizzy       : msg.channel.send({files: [iCatStickerPath+"dizzy.gif"]});
      break;
      case cmdPrefix+command.intensecat.easy        : msg.channel.send({files: [iCatStickerPath+"easy.gif"]});
      break;
      case cmdPrefix+command.intensecat.eat         : msg.channel.send({files: [iCatStickerPath+"eat.gif"]});
      break;
      case cmdPrefix+command.intensecat.evil1       : msg.channel.send({files: [iCatStickerPath+"evil1.gif"]});
      break;
      case cmdPrefix+command.intensecat.evil2       : msg.channel.send({files: [iCatStickerPath+"evil2.gif"]});
      break;
      case cmdPrefix+command.intensecat.feedme      : msg.channel.send({files: [iCatStickerPath+"feedme.gif"]});
      break;
      case cmdPrefix+command.intensecat.finally     : msg.channel.send({files: [iCatStickerPath+"finally.gif"]});
      break; 
      case cmdPrefix+command.intensecat.finish_eat  : msg.channel.send({files: [iCatStickerPath+"finish_eat.gif"]});
      break;
      case cmdPrefix+command.intensecat.goal        : msg.channel.send({files: [iCatStickerPath+"goal.gif"]});
      break;
      case cmdPrefix+command.intensecat.goodjob     : msg.channel.send({files: [iCatStickerPath+"goodjob.gif"]});
      break;
      case cmdPrefix+command.intensecat.happy       : msg.channel.send({files: [iCatStickerPath+"happy.gif"]});
      break;
      case cmdPrefix+command.intensecat.hey         : msg.channel.send({files: [iCatStickerPath+"hey.gif"]});
      break;
      case cmdPrefix+command.intensecat.high        : msg.channel.send({files: [iCatStickerPath+"high.gif"]});
      break;
      case cmdPrefix+command.intensecat.hmm         : msg.channel.send({files: [iCatStickerPath+"hmm.gif"]});
      break;
      case cmdPrefix+command.intensecat.icecream    : msg.channel.send({files: [iCatStickerPath+"icecream.gif"]});
      break;
      case cmdPrefix+command.intensecat.launch      : msg.channel.send({files: [iCatStickerPath+"launch.gif"]});
      break;
      case cmdPrefix+command.intensecat.lol         : msg.channel.send({files: [iCatStickerPath+"lol.gif"]});
      break;
      case cmdPrefix+command.intensecat.meh         : msg.channel.send({files: [iCatStickerPath+"meh.gif"]});
      break;
      case cmdPrefix+command.intensecat.melt        : msg.channel.send({files: [iCatStickerPath+"melt.gif"]});
      break;
      case cmdPrefix+command.intensecat.ohno        : msg.channel.send({files: [iCatStickerPath+"ohno.gif"]});
      break;
      case cmdPrefix+command.intensecat.okok        : msg.channel.send({files: [iCatStickerPath+"okok.gif"]});
      break;
      case cmdPrefix+command.intensecat.plsdun      : msg.channel.send({files: [iCatStickerPath+"plsdun.gif"]});
      break;
      case cmdPrefix+command.intensecat.seeyou      : msg.channel.send({files: [iCatStickerPath+"seeyou.gif"]});
      break;
      case cmdPrefix+command.intensecat.serious     : msg.channel.send({files: [iCatStickerPath+"serious.gif"]});
      break;
      case cmdPrefix+command.intensecat.shy         : msg.channel.send({files: [iCatStickerPath+"shy.gif"]});
      break;
      case cmdPrefix+command.intensecat.rudumb      : msg.channel.send({files: [iCatStickerPath+"rudumb.gif"]});
      break;
      case cmdPrefix+command.intensecat.slap        : msg.channel.send({files: [iCatStickerPath+"slap.gif"]});
      break;
      case cmdPrefix+command.intensecat.snack       : msg.channel.send({files: [iCatStickerPath+"snack.gif"]});
      break;
      case cmdPrefix+command.intensecat.start_eat   : msg.channel.send({files: [iCatStickerPath+"start_eat.gif"]});
      break;
      case cmdPrefix+command.intensecat.stop_play_me: msg.channel.send({files: [iCatStickerPath+"stop_play_me.gif"]});
      break;
      case cmdPrefix+command.intensecat.strike      : msg.channel.send({files: [iCatStickerPath+"strike.gif"]});
      break;
      case cmdPrefix+command.intensecat.throw       : msg.channel.send({files: [iCatStickerPath+"throw.gif"]});
      break;
      case cmdPrefix+command.intensecat.wait        : msg.channel.send({files: [iCatStickerPath+"wait.gif"]});
      break;
      case cmdPrefix+command.intensecat.wakeup      : msg.channel.send({files: [iCatStickerPath+"wakeup.gif"]});
      break;
      case cmdPrefix+command.intensecat.woah        : msg.channel.send({files: [iCatStickerPath+"woah.gif"]});
      break;
      
    }

});

// Prevent from idling, send request to url every 5 minutes
setInterval(function() {
    https.get("https://hisako-dev.glitch.me");
    console.log("ping!");
}, 200000);

// Log our bot in using the token
client.login(process.env.SECRET);