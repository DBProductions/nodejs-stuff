var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'nodejs' 
});

connection.connect();
connection.query('SET NAMES "UTF8";');

connection.query('CREATE TABLE nodetest (id int not null primary key auto_increment, name varchar(255)) engine=innodb default charset=utf8;');

connection.query('INSERT INTO nodetest (name) VALUES ("Müller");', function(err, rows, fields) {
    if (err) throw err;
    console.log(err, rows, fields);
});

connection.query('SELECT * FROM nodetest;', function(err, rows) {
    if (err) throw err;
    console.log(err, rows);
});

connection.query('DROP TABLE nodetest;');

connection.end();