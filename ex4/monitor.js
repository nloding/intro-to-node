
var fs = require('fs');
var utils = require('util');
var events = require('events');

function Monitor(filename) {
  var self = this;
  this.filename = filename;
  this.watch = null;

  if (!filename || !fs.existsSync(filename)) {
    setTimeout(
      function() {
        self.emit('fileNotFound', 'The file was not found.');
      }, 500
    );

    return;
  }

  this.readFile = function() {
    fs.readFile(self.filename, 'utf8', function(err, data) {
      if (err) {
        self.emit('fileNotFound', 'The file was not found.');
        return;
      }

      self.emit('codesRead', data);
    });
  }

  this.watchFile = function() {
    self.watch = fs.watch(self.filename, function() {
      self.readFile();
    });
  }

  this.unwatch = function() {
    console.log('unwatching ' + self.filename);
    // fs.unwatchFile(self.filename);
    if (self.watch) self.watch.close();
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
