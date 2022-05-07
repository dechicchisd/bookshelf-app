import Koa from 'koa'
import Router from 'koa-router'
import render from 'koa-ejs'
import { fileURLToPath } from 'url';
import path from 'path';
import serve from 'koa-static'
import pg from 'pg'

const { Client } = pg
const client = new Client()
await client.connect()
await client.end()
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

let port = process.env.PORT
if (port == null || port == '') port = 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
