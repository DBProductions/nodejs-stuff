var kue = require('kue');

var options = {
    prefix: 'q',
    redis: {
        port: 6379,
        host: '192.168.10.5'
  }
};

// create a queue
jobsQueue = kue.createQueue(options);

// listen on queue
jobsQueue.on('job enqueue', function(id,type) {
    console.log( 'job %s got queued', id );
}).on('job complete', function(result) {
    console.log("Job completed with data ", result);
}).on('job failed', function() {
    console.log("Job failed");
}).on('job progress', function(progress) {
    process.stdout.write('\r  job #' + job.id + ' ' + progress + '% complete');
});

// create a job
var job = jobsQueue.create('email', {title: 'Email', to: 'me@email.com', template: 'welcome'}).save(function (err) {
    if (!err) {
        console.log(job.id);
    }
});

jobsQueue.process('email', 3, function(job, done){
    console.log(job.data.to);
    done();
});
