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

const subjects = ['log', 'error'];
const msg = { content: {name: 'Nats'} };

subjects.forEach((subject) => {
  console.log(subject);
  nats.publish(subject, msg, () => {
    console.log(subject, msg);
  });
});
