var Memcached = require('memcached');
var memcached = new Memcached('192.168.10.5:11211');

memcached.set('foo1', 'bar1', 100, function (err) { 
	if (err) throw err;

	memcached.get("foo1", function( err, result ) {
	    if (err) throw err;
	    console.log(result);
	    memcached.replace('foo1', 'bar', 100, function (err) {
	    	if( err ) console.error( err );
	    	memcached.get("foo1", function( err, result ) {
	    		console.log(result);
	    	    memcached.end();
	    	});
	    });
    });
});
