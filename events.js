const events = require('events');
const util = require('util');

// create an eventemitter
let myEmitter = function () {
    events.EventEmitter.call(this);
    this.first = () => {
        let data = "some data";
        this.emit('first', data);
    }
    this.second = (data) => {
        this.emit('second', data);
    }
};
util.inherits(myEmitter, events.EventEmitter);

// create a listener
let myListener = function() {
    this.firstHandler = (data) => {
        console.log('received first event', data);
    },
    this.secondHandler = (data) => {
        console.log('received second event', data);
    }
};

let emitter = new myEmitter();
let listener = new myListener(emitter);

// add listener
emitter.on('first', listener.firstHandler);
emitter.once('first', listener.secondHandler);

emitter.on('second', listener.firstHandler);
emitter.on('second', listener.secondHandler);

emitter.first();
emitter.first();
emitter.second('send data');

// listener count
console.log(emitter.listenerCount('first'));

// remove listener
emitter.removeListener('second', listener.secondHandler);
emitter.removeAllListeners('second');
emitter.second('removed');

console.log(util.inspect(emitter.listeners('first')));
