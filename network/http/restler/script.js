var util = require('util'),
    rest = require('restler');

var restService = rest.service(function(u, p) {
    this.defaults.username = u;
    this.defaults.password = p;
}, { 
	baseURL: 'http://webservice-point.appspot.com/test'
}, {
    getData: function() {
        return this.get('/');
    }
});

var restClient = new restService('username', 'password');

restClient.getData().on('complete', function(data) {
    if (data instanceof Error) {
        console.log('Error: ' + data.message);
        this.retry(3000);
    } else {
        console.log(data);
    }
});
