var events = require('events'),
    util = require('util');

// create an eventemitter
var myEmitter = function() {
    events.EventEmitter.call(this);
    this.first = function() {
        var data = "some data";
        this.emit('first', data);
    }
    this.second = function(data) {        
        this.emit("second", data);
    }
};
util.inherits(myEmitter, events.EventEmitter);

// create a listener
var myListener = function() {
    this.firstHandler =  function(data){
        console.log("first event", data);
    },
    this.secondHandler = function(data) {
        console.log("second event", data);
    }
};

var emitter = new myEmitter();
var listener = new myListener(emitter);

// add listener
emitter.on('first', listener.firstHandler);
emitter.on('second', listener.firstHandler);
emitter.on('second', listener.secondHandler);

emitter.first();
emitter.second('send data');

// remove listener
emitter.removeListener('second', listener.secondHandler);
emitter.removeAllListeners('second');
emitter.second('removed');

console.log(util.inspect(emitter.listeners('first')));