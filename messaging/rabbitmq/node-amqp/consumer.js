const nodeAmqp = require('node-amqp');
let Worker = nodeAmqp.Worker;
let worker = new Worker({
  'host': 'amqp://rabbit:rabbit@localhost/my_vhost',
  'queueName': 'test-queue',
  'socketOptions': {}
});

// register a consumer
worker.consume().then(message => {
  worker.cancelConsumer();
  let messageArrived = message.content.toString();
  console.info(`${messageArrived} arrived from producer`);
}).catch(err => {
  throw new Error(err);
});

// query for a message:
worker.receive().then(message => {
  if (message) {
    let messageArrived = message.content.toString();
    console.info(`${messageArrived} present in queue`);
  }
}).catch(err => {
  throw new Error(err);
});
