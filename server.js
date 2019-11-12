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

const contentfulClient = contentful.createClient({
  accessToken: process.env.CONTENTFUL_APIKEY
})

client.on('ready', () => {
  
    client.user.setActivity('/help', {type: 'LISTENING'});
    console.log(`Logged in as ${client.user.tag}!`);  
  
    // const channel = client.channels.find(ch => ch.name === 'hisako🌐');
    // channel.send(":star: Command Update :star: \nAll sticker commands are now using prefix `/` \ne.g. `/ic1212` | `/bdhello`");
});


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
  
    if (receivedMessage.content.startsWith("/reminder")) {
        processReminderCommand(receivedMessage);
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
              .addField("❯ Page 1", entryWithId.slice(0, 10).join("\n"), true)
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

            if(allEntry.length < 10) {
              receivedMessage.channel.send(":x: There's no page 2! LMAO");
            }
            else {

                const allListEmbed = new Discord.RichEmbed()
                .setColor('#fafafa')
                .attachFile('img_misc/bucket.png')
                .setAuthor("Hisako's Personal Bucket", 'attachment://bucket.png')
                .setDescription('A bucket list to keep some notes for you')
                .addField("❯ Page 2", entryWithId.slice(10).join("\n"), true)
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
  
function processReminderCommand (receivedMessage) {

      let fullCommand = receivedMessage.content.substr(7); // Remove the leading exclamation mark
      let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
      let primaryCommand = splitCommand[1]; // The first word directly after the exclamation is the command
      let cmdArguments = splitCommand.slice(2).join(" "); // All other words are cmdArguments/parameters/options for the command
      let timeOut = 20000;
          
      if (primaryCommand == "set") {
        
        receivedMessage.channel.send("What time would you like to set? e.g. `1:00am/pm` to `12:59am/pm`");
                                
          const collectTime = new Discord.MessageCollector(receivedMessage.channel, m => m.author.id === receivedMessage.author.id, { max:1, time: timeOut });

          collectTime.on('collect', timeInput => {

            var timeRegex = /(1[012]|[1-9]):[0-5][0-9](am|pm)\s*/
            var validTimeInput = timeRegex.test(timeInput);
            
            console.log(validTimeInput);
                        
            if (validTimeInput === false || validTimeInput === undefined) {
              timeInput.channel.send(":x: Invalid time format");
            } 
            else {              
              timeInput.channel.send("What is the reminder about?");
              
                const collectText = new Discord.MessageCollector(receivedMessage.channel, m => m.author.id === receivedMessage.author.id, {max: 1, time: timeOut});

                collectText.on('collect', textInput => {
                  
                  if (textInput.content <= 0) {
                    textInput.channel.send(":x: You have to tell me what is this reminder about :sob:")
                  } 
                  else if (textInput.content > 100) {
                    textInput.channel.send(":x: Too long :sob: maximum character `100`")
                  }
                  else {
                    contentfulClient.getSpace(process.env.SPACE_ID)
                      .then((space) => space.getEnvironment('master'))
                      .then((environment) => environment.getEntry(process.env.REMINDER_ENTRY_ID))
                      .then((entry) => {

                      var reminder = entry.fields.reminder['en-US'].reminder;
                      var userId = timeInput.author.id;
                      var usernameWithTag = timeInput.author.tag;

                      reminder.time = timeInput.content;
                      reminder.text = textInput.content;
                      reminder.userid = "<@"+userId+">";
                      reminder.username = usernameWithTag;

                      reminder.push({time:reminder.time, text:reminder.text, userid:reminder.userid, username:reminder.username});
                      entry.fields.reminder['en-US'].reminder = reminder;

                      textInput.channel.send(":white_check_mark: Reminder has been set.");
                      return entry.update()

                    })
                    .catch(console.error)
                  }
                  
                });
                            
            } 
          });
      }
  }
    
});

client.on('message', (msg) => {
  
    if (msg.author == client.user) {
        return
    }
    
    if (msg.content.startsWith("/")) {
      
      processImageCommand(msg);
    
    }
    
    function processImageCommand(msg) {
      
      let content = msg.content.toLowerCase().substr(1);      
      let bduckImagePath     = __dirname +"/stickers_bduck/"+content+".gif";
      let miscImagePath      = __dirname +"/stickers_misc/"+content+".gif";
      let iCatImagePath      = __dirname +"/stickers_intensecat/"+content+".gif";
      let hdWeaponImagePath  = __dirname +"/img_weapon/"+content+".png";
      let hdDefensiveImagePath = __dirname +"/img_stratagem/defensive/"+content+".png";
      let hdOffensiveImagePath = __dirname +"/img_stratagem/offensive/"+content+".png";
      let hdSpecialImagePath = __dirname +"/img_stratagem/special/"+content+".png";
      let hdSupplyImagePath = __dirname +"/img_stratagem/supply/"+content+".png";

      if (content) {

        // B.duck sticker
        if (fs.existsSync(bduckImagePath)) {
          msg.channel.send({files: [bduckImagePath]});
        }
        
        // Misc sticker
        if (fs.existsSync(miscImagePath)) {
          msg.channel.send({files: [miscImagePath]});
        }
        
        // Intense Cat sticker
        if (fs.existsSync(iCatImagePath)) {
          msg.channel.send({files: [iCatImagePath]});
        }  
        
        // HD Weapon Image
        if (fs.existsSync(hdWeaponImagePath)) {
          msg.channel.send(message.weapon[content], {files: [hdWeaponImagePath]});
        }

        // HD Defensive Stratagem Image
        if (fs.existsSync(hdDefensiveImagePath)) {
          msg.channel.send(message.defensive[content], {files: [hdDefensiveImagePath]});
        }
        
        // HD Offensive Stratagem Image
        if (fs.existsSync(hdOffensiveImagePath)) {
          msg.channel.send(message.offensive[content], {files: [hdOffensiveImagePath]});
        }
        
        // HD Special Stratagem Image
        if (fs.existsSync(hdSpecialImagePath)) {
          msg.channel.send(message.special[content], {files: [hdSpecialImagePath]});
        }
        
        // HD Supply Stratagem Image
        if (fs.existsSync(hdSupplyImagePath)) {
          msg.channel.send(message.supply[content], {files: [hdSupplyImagePath]});
        }
        
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
    var ampm = hours >= 12 ? 'pm' : 'am';
  
//     if (hours >= 23 || hours <= 7) {
//       if (msg.isMentioned(kimsphereId)) {
        
//         hours = hours % 12; // Use modulus operator to get remainder of hours-12
//         hours = hours ? hours : 12; // conditon, when the remainder is '0', should be '12'
        
//         msg.reply(" `(GMT+8) "+hours+":"+minutes+" "+ampm+ "`  Kim is sleeping like a DEAD now :joy:");
//       }
//     }

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
        .setDescription('Command Prefix : `/`')
        .setThumbnail('https://cdn.streamelements.com/uploads/33f405cc-22ce-45a8-9f92-a01efedb5b62.gif')
        .addField('❯ Available stickers', commandList.join(" "), true)
        .setTimestamp()
        .setFooter('Hisako');
    
        msg.channel.send(bduckEmbed);
   
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


/*
|-----------------------------------------------------------------------------
| Helldivers Command List
|-----------------------------------------------------------------------------
*/

    if (msgContent === prefix+command.help_helldivers) {
        
        var offensive   = [];
        var defensive   = [];
        var supply      = [];
        var weapon      = [];
        var special     = [];
      
        for (cmd in command.hd.offensive) {
          offensive.push("`"+command.hd.offensive[cmd]+"` | ");
        }
        for (cmd in command.hd.defensive) {
          defensive.push("`"+command.hd.defensive[cmd]+"` | ");
        }
        for (cmd in command.hd.supply) {
          supply.push("`"+command.hd.supply[cmd]+"` | ");
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
        .addField('❯ Supply Stratagems', supply.join(" "), true)
        .addField('❯ Weapons', weapon.join(" "), true)
        .addField('❯ Special Stratagems', special.join(" "), true)
        .addField('❯ Transmitter Objective Key','`trans`',true)
        .setTimestamp()
        .setFooter('Hisako');

        msg.channel.send(helldiversEmbed);
    }

    // Transmitter objective steps
    switch(msgContent) {
        case prefix+command.hd.trans : msg.channel.send(message.objective.trans_1 + 
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
        .attachFile('stickers_intensecat/icevil1.gif')
        .setAuthor('Intense Cat', 'attachment://icevil1.gif')
        .setDescription('Command Prefix : `/`')
        .setThumbnail('attachment://icevil1.gif')
        .addField('❯ Available stickers', commandList.join(" "), true)
        .setTimestamp()
        .setFooter('Hisako');
    
        msg.channel.send(iCatEmbed);
   
    }


/*
|-----------------------------------------------------------------------------
| Reminder Command Help
|-----------------------------------------------------------------------------
*/

    if (msgContent === prefix+command.help_reminder) {
      
      msg.channel.send("Use `/reminder set` command to set a time reminder");
      
    }
  
});



// Prevent from idling, send request to url every 1 minutes
setInterval(function() {
    https.get("https://rokusinao.glitch.me");
    console.log("ping!");
    
    var date = new Date();
    var newDate =     date.toLocaleTimeString;
    var timezoneAsia = date.toLocaleString("en-US", {timeZone: "Asia/Singapore"});
    var datetimeAsia = new Date(timezoneAsia);
    var hours        = datetimeAsia.getHours();
    var minutes      = datetimeAsia.getMinutes();
    var ampm         = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12; // Use modulus operator to get remainder of hours-12
    hours = hours ? hours : 12; // conditon, when the remainder is '0', should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var currentTime   = hours+":"+minutes+ampm;
  
    // To get the array index by matching attribute and value
    function findByAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
          if (array[i][attr] === value) {              
            return i;
          }
        }
    }
  
    contentfulClient.getSpace(process.env.SPACE_ID)
    .then((space) => space.getEnvironment('master'))
    .then((environment) => environment.getEntry(process.env.REMINDER_ENTRY_ID))
    .then((entry) => {
    
      let reminders = entry.fields.reminder['en-US'].reminder;
      
      for (var i = 0; i < reminders.length; i++) {
        
        var allReminderTime = reminders[i].time;
        var matchTime = currentTime;
        var regexTime = new RegExp( matchTime, 'g' );
        
        var getTime = allReminderTime.match(regexTime);
        if (getTime != null) {

          var newTime = getTime.toString();

          if (currentTime === newTime) {
            var found = findByAttr(reminders, 'time', newTime)
            var username = reminders[found].username;
            var text = reminders[found].text;
            var userId = reminders[found].userid
        
            console.log("Time is matched");
            
            const channel = client.channels.find(ch => ch.id === process.env.CHAT_CHANNEL_ID);
            const reminderEmbed = new Discord.RichEmbed()
            .setColor('#bf00ff')
            .addField(':bell: Reminder ',text, true)
            .setTimestamp()
            .setFooter(username)

            channel.send(reminderEmbed);
            
            reminders.splice(found, 1);
            entry.fields.reminder['en-US'].reminder = reminders;
            return entry.update()
          }
        }
      }
    })  

  .catch(console.error)


}, 60 * 1000);

// Log our bot in using the token
client.login(process.env.SECRET);