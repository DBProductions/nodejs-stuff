var context = require('rabbit.js').createContext();

context.on('ready', function() {
    var sub = context.socket('SUB');
    sub.setEncoding('utf8');
    sub.connect('events', function() {
        sub.on('data', function(message) { 
        	console.log(message); 
        });
    });
});