var stomp = require('stomp');

var num = process.argv[2];

var receipt = true;

var stomp_args = {
    port: 61613,
    host: 'localhost',
    debug: true,
    login: 'guest',
    passcode: 'guest',
}

var client = new stomp.Stomp(stomp_args);

var queue = '/queue/test_stomp';

client.connect();

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

client.on('connected', function() {
    num = num || 100;
    for (var i = 0; i < num; i++) {
        client.send({
            'destination': queue,
            'body': 'Testing ' + i,
            'persistent': 'true'
        }, receipt);
        sleep(250);
    }
    console.log('Produced ' + num + ' messages');
    client.disconnect();
});

client.on('receipt', function(receipt) {
    console.log("RECEIPT: " + receipt);
});

client.on('error', function(error_frame) {
    console.log(error_frame.body);
    client.disconnect();
});

process.on('SIGINT', function() {
    console.log('Produced ' + num + ' messages');
    client.disconnect();
    process.exit(0);
});