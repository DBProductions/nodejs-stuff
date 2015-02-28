var kue = require('kue');

var options = {
    prefix: 'q',
    redis: {
        port: 6379,
        host: '192.168.10.5'
  }
};

jobsQueue = kue.createQueue(options);

kue.app.set('title', 'Kue UI');
kue.app.listen(3000);