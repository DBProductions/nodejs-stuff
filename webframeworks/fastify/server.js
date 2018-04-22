const PORT = 3000;
const fastify = require('fastify')();

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          response: {
            type: 'string'
          }
        }
      }
    }
  },
  beforeHandler: (request, reply, done) => {
    console.log('Request:', Date.now(), request.id);
    done()
  },
  handler: (request, reply) => {
    reply.send({response: 'fastify'});
  }
});

fastify.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server listening on ${fastify.server.address().port}`)
});
