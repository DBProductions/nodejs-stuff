const BunnyBus = require('bunnybus');
const bunnyBus = new BunnyBus({
  user: 'rabbit',
  password: 'rabbit',
  vhost: 'my_vhost'
});

(async () => {
  //create a subscription
  await bunnyBus.subscribe('bunnyBusQueue', { 
    'create-event' : (message, ack) => {
        console.log(message);
        ack();
    },
    'update-event' : (message, ack) => {
        console.log(message);
        ack();
    }
  });
})();