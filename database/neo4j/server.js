var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');

console.log(db);

var nodeId = null;
var node = db.createNode({name: 'Julia'});

node.save(function (err, node) {
    if (err) {
        console.log('Error:', err);
    } else {
        nodeId = node.id;
        console.log('Node saved:', node.id, node.data);
    }

    var otherNode = db.createNode({name: 'Sam'});
    otherNode.save(function (err, otherNode) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log('Node saved:', otherNode.id, otherNode.data);
        }

        otherNode.createRelationshipTo(node, 'known', {status: 'classmates'}, function(err, rel) {
            if (err) { throw err; }
            console.log(otherNode.id, node.id, rel.data);        
        
            db.getNodeById(nodeId, function (err, node) {
                console.log('Node:', node.id, node.data);
    
                node.outgoing('known', function(err, relationships) {
                    if (err) { throw err; }
                    console.log('outgoing:', relationships.length);
                });

                node.incoming('known', function(err, relationships) {
                    if (err) { throw err; }
                    console.log('incoming:', relationships.length);
                });
            });
        });
    });
});