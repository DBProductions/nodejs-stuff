const amqp = require('amqplib/callback_api');

const connect = (url) => new Promise((resolve, reject) => {
    amqp.connect(url, (err, conn) => {
        if (err) reject(err);
        resolve(conn);
    });
});

const createChannel = (conn) => new Promise((resolve, reject) => {
    conn.createChannel((err, ch) => {
        if (err) reject(err);
        resolve(ch);
    });
});

const errorCatcher = (promise) => {
   return promise.then(data => {
      return [null, data];
   }).catch(err => [err]);
}

async function getConnectedChannel(url) {
    let err, conn, channel;

    [err, conn] = await errorCatcher(connect(url));
    if (!conn) {
       console.log('No connection');
    } else {
        conn.on('error', (err) => {
            if (err.message !== 'Connection closing') {
                console.log('[AMQP] connection error', err);
            }
        });
        conn.on('close', () => {
            console.log('[AMQP] start reconnecting');
            //return setTimeout(async () => { conn = await connect(url); }, 100000);
        });

        channel = await createChannel(conn);
        if (!channel) {
           console.log('No connection');
        } else {
            channel.on('drain', (err) => {
                console.log('[AMQP] published missed event');
            });
            // emit when the closing handshake has completed
            channel.on('close', () => {
                console.log('[AMQP] channel closed');
            });
            // emit if the server closes the channel
            channel.on('error', (err) => {
                console.log('[AMQP] channel error while consuming', 'error', err);
            });
        }
    }
    return [err, channel];
}

module.exports = getConnectedChannel;
