const nodeAmqp = require('node-amqp');
const Task = nodeAmqp.Task;
let task = new Task({
  'host': 'amqp://rabbit:rabbit@localhost/my_vhost',
  'queueName': 'test-queue',
  'socketOptions': {}
});

task.send('node-amqp works');
