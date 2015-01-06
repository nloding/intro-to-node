#! /usr/local/bin/node

var fs = require('fs');
var bombCrypto = require('../bombCrypto.js');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// functions
var prompt = function() {
  rl.question("Which file has the disarm codes? ", function(answer) {
    if (!answer || !fs.existsSync(answer)) {
      console.log('You entered an invalid file, jerk, try again...');
      prompt();
      return;
    }

    dumpCode(answer);
    watchCode(answer);
  });
}

var dumpCode = function(codeFile) {
  var read = fs.readFile(codeFile, 'utf8', function(err, data) {
    if (err) {
      console.log('BOOOOOOOOOOOOOOOM! You\'re dead!');
      throw err;
    }

    if (!data) {
      console.log('No data was read... huh?');
    } else {
      console.log('The code is: ' + data);
      console.log('Decrypting the code...');
      console.log('Decrypted code: ' + bombCrypto.decrypt(data));
    }
  });
}

var watchCode = function(codeFile) {
  console.log('Watching for changes...');

  var watch = fs.watch(codeFile, function(event, filename) {
    dumpCode(codeFile);
  });
}
// endfunctions

prompt();
