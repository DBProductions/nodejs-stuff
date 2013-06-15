var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("connect", function () {
    console.log("connect");
});

client.on("ready", function () {
    console.log("ready");
});

client.set("stringkey", "string val", redis.print);

client.hset("hashkey", "hashtest 1", "some value", redis.print);

client.hset(["hashkey", "hashtest 2", "some other value"], redis.print);

client.hkeys("hashkey", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});

client.set('name', 'redis and node', function(error, result) {
    if (error) res.send('Error: ' + error);
    else console.log('Saved');
    client.quit();
});

client.get('name', function(error, result) {
    if (error) console.log('Error: '+ error);
    else console.log('Name: ' + result);
    client.quit();
});