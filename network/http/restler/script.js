var util = require('util'),
    rest = require('restler');

// define service
var restService = rest.service(function(u, p) {
    this.defaults.username = u;
    this.defaults.password = p;
}, { 
	baseURL: 'http://webservice-point.appspot.com'
}, {
    getData: function() {
        return this.get('/test');
    },
    postData: function(data) {
        return this.post('/test', { data: data });
    }
});

// use service
var restClient = new restService('username', 'password');

restClient.getData().on('complete', function(data) {
    if (data instanceof Error) {
        console.log('Error: ' + data.message);
        this.retry(3000);
    } else {
        console.log(data);
    }
});

restClient.postData({name: "restler", test: "post"}).on('complete', function(data) {
    if (data instanceof Error) {
        console.log('Error: ' + data.message);
        this.retry(3000);
    } else {
        console.log(data);
    }
});
