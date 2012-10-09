var events = require('events'),
    util = require('util');

var myEmitter = function() {
    events.EventEmitter.call(this);
    this.first = function() {
        this.emit('first');
    }
    this.second = function(data) {
        //var data = "some data";
        this.emit("second", data);
    }
};
util.inherits(myEmitter, events.EventEmitter);

var myListener = function() {
    this.firstHandler =  function(){
        console.log("first event");
    },
    this.secondHandler = function(data) {
        console.log("second event");
        console.log(data);
    }
};

var emitter = new myEmitter();
var listener = new myListener(emitter);
emitter.on('first', listener.firstHandler);
emitter.on('second', listener.secondHandler);

emitter.first();
emitter.second('send data');

console.log(util.inspect(emitter.listeners('first')));