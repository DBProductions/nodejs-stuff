var levelup = require('levelup');

var db = levelup(__dirname + '/myleveldb');

db.put('key', 'value');

db.put('name', 'LevelUP', function (err) {
    if (err) { 
  	    console.log(err);
  	} else {
        db.get('name', function (err, value) {
        	if (err) { 
  	            console.log(err);
  	        } else {
                console.log('name=' + value);
            }
        });
  	}
});