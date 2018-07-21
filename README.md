# NodeJS stuff

Simple examples with NodeJS and different NPM packages.  
It's maybe helpful when you want to start or work with NodeJS.  

[NodeJS Homepage](https://nodejs.org)  
[io.js](https://iojs.org) merged with the NodeJS project again  
[Ayo.js](https://github.com/ayojs/ayo) newest fork  

### Prerequisites

You must have git, node and npm installed.  
There are other dependencies like MongoDB, Redis and so on.  
Depending on your environment you need to install them or extend the docker-compose file.

### Clone repository

Clone the nodejs-stuff repository.

    $ git clone git@github.com:DBProductions/nodejs-stuff.git
    $ cd nodejs-stuff

### Dependencies

Install all the dependencies or pick the ones you want to use from the package.json file.

    $ npm install

### Docker

The docker-compose file includes several third party software like RabbitMQ, NATS, Kafka, Redis, MongoDB, MySQL and Neo4j.  

    $ docker-compose up redis
    $ docker-compose up mongodb redis

### npm run

Have a look at `package.json` file to see the npm scripts.  

    $ npm i -g npm-ls-scripts
    $ ls-scripts


### Folder structure

    database
        cayley
        dirty
        mongodb
        mongolia
        mongoose
        monk
        mysql
        neo4j
        redis

    filesystem

    messaging
        faye
        kafka
        kue
        monq
        nats
        rabbitmq
            amqp
            amqp-connection-manager
            amqplib
            jackrabbit
            node-amqp
            rabbit.js

    network
        http
            request    
            webserver
        net
        udp

    realtime
        socket.io
        sockjs

    webframeworks
        connect
        express
        fastify
        hapi
        koa
        restify

## Feedback
Star this repo if you found it useful. Use the github issue tracker to give feedback on this repo.
