/**
 * Recursive file operations
 */
var wrench = require('wrench'),
    util = require('util');

var files = [];
wrench.readdirRecursive('.', function(err, curFiles) {
	if (err) { throw err; }
	if (curFiles !== null) {
	    console.log(curFiles);	
	}
});