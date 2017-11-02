const monq = require('monq');
const client = monq('mongodb://localhost:27017/monq_example');
// create queue
const queue = client.queue('work');

// enqueue jobs by name
queue.enqueue('reverse', { text: 'monq' }, (err, job) => {
    console.log(job.data._id, 'enqueued', job.data.params);
});
queue.enqueue('increase', { amount: 3 }, (err, job) => {
    console.log(job.data._id, 'enqueued', job.data.params);
});
