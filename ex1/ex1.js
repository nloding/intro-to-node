#! /usr/local/bin/node

var fs = require('fs');
var codeFile = process.argv[2];

if (!codeFile || !fs.existsSync(codeFile)) {
  console.log('Invalid file specified: ' + codeFile);
  return;
}

var read = fs.readFile(codeFile, 'utf8', function(err, data) {
  if (err) {
    console.log('BOOOOOOOOOOOOOOOM! You\'re dead!');
    throw err;
  }

  console.log('The code is: ' + data);
});
