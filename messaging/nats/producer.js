const NATS = require('nats');
const nats = NATS.connect();

const subject = 'subject';
const msg = 'Hello Nats!';

nats.publish(subject, msg, () => {
  console.log('Published [' + subject + '] : "' + msg + '"');
  nats.close();
});
