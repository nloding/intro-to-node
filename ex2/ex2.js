#! /usr/local/bin/node

var fs = require('fs');
var bombCrypto = require('../bombCrypto.js');
var monitor = require('./monitor.js');
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

    watch(answer);
  });
}

var watch = function(filename) {
  var client = monitor.watch(filename);
  client.on('codesRead', function(data) {
    decryptCodes(data);
  })
}

var decryptCodes = function(data) {
  console.log('The raw code is: ' + data);
  console.log('Decrypting the code...');
  console.log('Decrypted code: ' + bombCrypto.decrypt(data));
}
// endfunctions

prompt();
