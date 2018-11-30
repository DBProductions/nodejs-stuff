const BunnyBus = require('bunnybus');
const bunnyBus = new BunnyBus({
  user: 'rabbit',
  password: 'rabbit',
  vhost: 'my_vhost'
});

bunnyBus.publish({ event: 'create-event', message: 'hello world!' });

bunnyBus.publish({ event: 'update-event', id: '1234-5678', message: 'hello world!' });