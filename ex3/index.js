#! /usr/local/bin/node

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', function(socket){
  console.log('connected');

  socket.on('message', function(msg){
    console.log('message: ' + msg);
    io.emit('message', msg);
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
