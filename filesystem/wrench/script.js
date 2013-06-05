var wrench = require('wrench'),
    util = require('util');

var files = [];
wrench.readdirRecursive('.', function(error, curFiles) {
	if (curFiles !== null) {
	    console.log(curFiles);	
	}
});