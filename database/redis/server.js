const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
    console.log("Error " + err);
});

client.on("connect", () => {
    console.log("connect");
});

client.on("ready", () => {
    console.log("ready");
});

client.set("stringkey", "string val", redis.print);

client.hset("hashkey", "hashtest 1", "some value", redis.print);

client.hset(["hashkey", "hashtest 2", "some other value"], redis.print);

client.hkeys("hashkey", (err, replies) => {
    console.log(replies.length + " replies:");
    replies.forEach((reply, i) => {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});

client.set('name', 'redis and node', (error, result) => {
    if (error) res.send('Error: ' + error);
    else console.log('Saved');
    client.quit();
});

client.get('name', (error, result) => {
    if (error) console.log('Error: '+ error);
    else console.log('Name: ' + result);
    client.quit();
});
