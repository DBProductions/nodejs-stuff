const NATS = require('nats');
const nats = NATS.connect({
  url: 'nats://localhost:4222',
  json: true
});

nats.on('error', function(err) {
  console.log(err);
});

nats.on('connect', function(nc) {
  console.log('connected');
});

nats.on('disconnect', function() {
  console.log('disconnect');
});

nats.on('reconnecting', function() {
  console.log('reconnecting');
});

nats.on('reconnect', function(nc) {
  console.log('reconnect');
});

nats.on('close', function() {
  console.log('close');
});

const subjectHandler = {
  'log': (msg) => {
    console.log(msg);
  },
  'error': (msg) => {
    console.error(msg);
  }
}

for (let subject in subjectHandler) {
  if (subjectHandler.hasOwnProperty(subject)) {
    console.log(subject + " -> " + subjectHandler[subject]);
    nats.subscribe(subject, subjectHandler[subject]);
  }
}