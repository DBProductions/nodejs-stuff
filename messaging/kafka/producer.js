const kafka = require('kafka-node');

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const Client = kafka.Client;

const client = new Client('127.0.0.1:2181', 'my-producer', {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});

client.once('connect', function () {
    client.loadMetadataForTopics([], (error, results) => {
      if (error) {
      	return console.error(error);
      }
      console.log(results);
    });
});

const argv = require('optimist').argv;
const topic = argv.topic || 'topic';
const p = argv.p || 0;
const a = argv.a || 0;

const producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', () => {
  let message = 'a message';
  let otherMessage = 'an other message';
  let keyedMessage = new KeyedMessage('keyed', 'a keyed message');

  let payload = [
      {
          topic: topic,
          partition: p,
          messages: [
              message,
              otherMessage,
              keyedMessage
          ],
          attributes: a
      }
  ];

  producer.send(payload, (err, result) => {
    if (err) console.log('error', err);
    console.log(result);
    process.exit();
  });
});

producer.on('error', (err) => {
  console.log('error', err);
});
