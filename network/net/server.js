const net = require('net');
let buffer = [];

let server = net.createServer((socket) => {
    // handle data
    let dataArrived = (data) => {
        console.log('client connection');
        buffer.push(data);
        socket.write('{"response":"json"}\n');
        socket.end();
    };
    // connection close
    let connectionEnd = () => {
        try {
            let data = buffer.join("");
            let _data = data.toString('utf8');
            console.log(_data);
            buffer = [];
            socket.end('ok');
        } catch(e) {
            console.log('Error: ' + e.message);
            return;
        }
        console.log('close');
    };
    // handle error
    let errorHandler = (err) => {
        console.log(err.message);
    };

    // handle events
    socket.on('data', dataArrived);
    socket.on('end', connectionEnd);
    socket.on('error', errorHandler);
});

server.listen(3000);
console.log('server listening on ' + server.address().address + ':' + server.address().port);
