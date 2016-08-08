"use strict";
const util = require('util');
const rest = require('restler');

// define service
let restService = rest.service(function (u, p) {
    this.defaults.username = u;
    this.defaults.password = p;
}, {
	baseURL: 'http://webservice-point.appspot.com'
}, {
    getData: function () {
        return this.get('/test');
    },
    postData: function (data) {
        return this.post('/test', { data: data });
    }
});

// use service
let restClient = new restService('username', 'password');

restClient.getData().on('complete', (data) => {
    if (data instanceof Error) {
        console.log('Error: ' + data.message);
        this.retry(3000);
    } else {
        console.log(data);
    }
});

restClient.postData({name: "restler", test: "post"}).on('complete', (data) => {
    if (data instanceof Error) {
        console.log('Error: ' + data.message);
        this.retry(3000);
    } else {
        console.log(data);
    }
});
