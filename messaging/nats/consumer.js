const NATS = require('nats');
const nats = NATS.connect();

const subject = 'subject';

nats.subscribe(subject, (msg) => {
  console.log('Received a message: ' + msg);
});
