const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const PORT = 3000;

app.context.ctxproperty = 'db';

router.get('/', list)
      .get('/resource', entry);

async function list(ctx) {
    ctx.body = 'List ' + app.context.ctxproperty;
}

async function entry(ctx) {
    ctx.body = 'Resource ' + app.context.ctxproperty;
}

app.use(router.routes());

app.on('error', err => {
    console.log('Server error', err);
});

app.listen(PORT);
