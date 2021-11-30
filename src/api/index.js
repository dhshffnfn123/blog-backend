const Router = require('koa-router');
const api = new Router();

api.get('/test', ctx => {
    ctx.body = 'test 성공';
});

// 라우터를 내보냄
module.exports = api;