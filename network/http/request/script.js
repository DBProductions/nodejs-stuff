"use strict";
const request = require("request");

request("http://www.google.com", (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});

let opts = {
    url: "http://www.google.com",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    json: {
        name: "Test",
        role: "user"
    }
};
request(opts, (error, response, body) => {
    if (!error && response.statusCode == 405) {
        console.log(body);
    }
});
