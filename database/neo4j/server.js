const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase('http://username:password@localhost:7474');

// create a labeled node
db.cypher({
    query: 'CREATE (u:User {name: {name}})',
    params: { name: 'Julia' }
}, (err) => { if (err) throw err; });

// query all nodes
db.cypher({
    query: 'MATCH (n) RETURN n',
    params: {},
}, (err, results) => {
    if (err) throw err;
    results.forEach((value, key) => {
        console.log(key, value);
    });
});
