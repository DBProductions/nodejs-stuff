const kafka = require('kafka-node');

const Consumer = kafka.Consumer;
const Client = kafka.Client;

const topics = [
    { topic: 'topic', partition: 0 }
];
const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8'
};

const client = new Client('127.0.0.1:2181', 'my-consumer', {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});

client.once('connect', function () {
    client.loadMetadataForTopics([], function (error, results) {
      if (error) {
      	return console.error(error);
      }
      for (let t in results[1].metadata) {
          console.log(t);
          console.log(results[1].metadata[t]);
      }

    });
});

const consumer = new Consumer(client, topics, options);

let msgCount = 0;
consumer.on('message', (message) => {
    msgCount++;
    console.log(msgCount, message);
});

consumer.on('error', (err) => {
    console.log('error', err);
});
