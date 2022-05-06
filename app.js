import Koa from 'koa'
import Router from 'koa-router'
import render from 'koa-ejs'
import { fileURLToPath } from 'url';
import path from 'path';
import serve from 'koa-static'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa()
app.use(serve(__dirname + '/public'))
const router = new Router()

render(app, {
    root: path.join(__dirname, 'views'),
    viewExt: 'html'
})

router.get('/', async ctx => {
    return ctx.render('index')
})

app.use(router.routes())

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
