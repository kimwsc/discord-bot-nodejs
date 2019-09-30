import 'require';
const fs = require('fs');

let jsonCommand = fs.readFileSync('../command.json');
let cmd         = JSON.parse(jsonCommand);

$( document ).ready(function() {
    console.log( cmd );
});

