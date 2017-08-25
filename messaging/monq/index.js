const monq = require('monq');
const client = monq('mongodb://localhost:27017/monq_example');

// define queue
let queue = client.queue('work');

// enqueue two jobs by name
queue.enqueue('reverse', { text: 'skrow' }, (err, job) => {
    console.log('job', job.data._id, 'enqueued', job.data.params);
});
queue.enqueue('add', { amount: 3 }, (err, job) => {
    console.log('job', job.data._id, 'enqueued', job.data.params);
});

// create worker to process the jobs
let worker = client.worker(['work']);

// register functions like job names
worker.register({
    add: (params, callback) => {
        try {
            let amount = params.amount + 1;
            callback(null, amount);
        } catch (err) {
            callback(err);
        }
    },
    reverse: (params, callback) => {
        try {
            var reversed = params.text.split('').reverse().join('');
            callback(null, reversed);
        } catch (err) {
            callback(err);
        }
    }
});

// listen to worker events
worker.on('dequeued', function (data) {
    console.log('job', data._id, 'dequeued', data.params);
});
worker.on('failed', function (data) {
    console.log('failed', data);
});
worker.on('complete', function (data) {
    console.log('job', data._id, 'complete', data.params, data.result);
});
worker.on('error', function (err) {
    console.log('error', data);
});

// start worker
worker.start();
