var cayley = require('cayley');

var client = cayley("http://localhost:64210/");
var g = client.graph;

g.V().All(function(err, result) {
    console.log(result);
});

client.delete([{
    subject: "bob",
    predicate: "knows",
    object: "alice"
}], function(err, body, res) {
    if (err) throw err;
    console.log(body.result);
});

client.write([{
    subject: "peter",
    predicate: "knows",
    object: "alice"
}], function(err, body, res) {
    if (err) throw err;
    console.log(body.result);
});

g.V().Out().All(function(err, result) {
    if (err) throw err;
    console.log(result);
});

g.V("alice").Out().All(function(err, result) {
    if (err) throw err; 
    console.log(result);
});

g.V().In().All(function(err, result) {
    if (err) throw err;
    console.log(result);
});

g.V("alice").In().All(function(err, result) {
    if (err) throw err;
    console.log(result);
});

g.V("alice").Out("knows").All(function(err, result) {
    if (err) throw err;
    if (result && result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
        }        
    } else {
        console.log(result);
    }
});
