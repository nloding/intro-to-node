
var fs = require('fs');
var utils = require('util');
var events = require('events');

function Monitor(filename) {
  var self = this;
  this.filename = filename;

  this.readFile = function() {
    fs.readFile(self.filename, 'utf8', function(err, data) {
      if (err) {
        console.log('BOOOOOOOOOOOOOOOM! You\'re dead!');
        throw err;
      }

      self.emit('codesRead', data);
    });
  }

  this.watchFile = function() {
    fs.watch(self.filename, function() {
      self.readFile();
    });
  }

  this.readFile();
  this.watchFile();
}

utils.inherits(Monitor, events.EventEmitter);

module.exports = {
  Monitor: Monitor,
  watch: function(file) {
    return new Monitor(file);
  }
}
