const kue = require('kue');

const options = {
    prefix: 'q',
    redis: {
        port: 6379,
        host: '127.0.0.1'
    }
};

// create a queue
jobsQueue = kue.createQueue(options);

// listen on queue events
jobsQueue.on('job enqueue', (id, type) => {
    console.log( 'job %s got queued', id );
}).on('job complete', (result) => {
    console.log("Job completed with data ", result);
}).on('job failed', () => {
    console.log("Job failed");
}).on('job progress', (progress) => {
    process.stdout.write('\r  job #' + job.id + ' ' + progress + '% complete');
});

// create a job
let jobData = {
    title: 'Email',
    to: 'me@email.com',
    template: 'welcome'
};
let job = jobsQueue.create('email', jobData).save((err) => {
    if (!err) {
        console.log(job.id);
    }
});

jobsQueue.process('email', 3, (job, done) => {
    console.log(job.data.to);
    done();
});
