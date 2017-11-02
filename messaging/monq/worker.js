const monq = require('monq');
const client = monq('mongodb://localhost:27017/monq_example');
// create worker to process jobs
let worker = client.worker(['work']);

// register functions like job names
worker.register({
    increase: (params, callback) => {
        try {
            let amount = params.amount + 1;
            callback(null, amount);
        } catch (err) {
            callback(err);
        }
    },
    reverse: (params, callback) => {
        try {
            let reversed = params.text.split('').reverse().join('');
            callback(null, reversed);
        } catch (err) {
            callback(err);
        }
    }
});

// listen to worker events
worker.on('dequeued', function (data) {
    console.log(data._id, 'dequeued', data.params);
});
worker.on('failed', function (data) {
    console.log('failed', data);
});
worker.on('complete', function (data) {
    console.log(data._id, 'complete', data.params, data.result);
});
worker.on('error', function (err) {
    console.log('error', data);
});

// start worker
worker.start();
