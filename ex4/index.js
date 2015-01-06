#! /usr/local/bin/node

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bombCrypto = require('../bombCrypto.js');
var monitor = require('./monitor.js');
var client;

var watch = function(filename) {
  if (client) client.unwatch();

  client = monitor.watch(filename);

  client.on('codesRead', function(data) {
    var decrypted = bombCrypto.decrypt(data);
    console.log('The raw code is: ' + data);
    console.log('Decrypting the code...');
    console.log('Decrypted code: ' + decrypted);
    io.emit('decryptedCode', decrypted);
  });

  client.on('fileNotFound', function(data) {
    console.log('file not found');
    io.emit('fileNotFound', 'The file was not found, time is ticking...');
  });
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function(socket){
  console.log('connected');

  socket.on('filename', function(msg){
    console.log('filename: ' + msg);
    watch(msg);
  });

  socket.on('disconnect', function(){
    console.log('disconnected');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});






// // respond with "Hello World!" on the homepage
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// })
//
// // accept POST request on the homepage
// app.post('/', function (req, res) {
//   res.send('Got a POST request');
// })
//
// // accept PUT request at /user
// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user');
// })
//
// // accept DELETE request at /user
// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user');
// })
