import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import render from 'koa-ejs'
import { fileURLToPath } from 'url';
import path from 'path';
import serve from 'koa-static'
import pg from 'pg'



const { Pool } = pg
const url = process.env.DATABASE_URL
let pool
if (url == null || url == '') {
    pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: 'password'
    }
    )
} else {
    pool = new Pool({
        connectionString: url,
        ssl: {
            rejectUnauthorized: false
        }
    })
}

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
    await ctx.render('index', {
        title: 'Books',
    })
})

router.post('/books', async ctx => {
    const title = ctx.request.body.title
    const author = ctx.request.body.author
    ctx.body = ctx.request.body

    const client = await pool.connect()
    const result = await client.query(`insert into Books (title, author) values ($1, $2)`, [title, author])
    ctx.body = 'You succesfully added a new book'

})

router.get('/db', async ctx => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Books');
        const results = { 'results': (result) ? result.rows : null };
        ctx.body = JSON.stringify(results)
        client.release();
    } catch (err) {
        console.error(err);
        ctx.body = "Error " + err;
    }
})

app.use(koaBody()).use(router.routes())

let port = process.env.PORT
if (port == null || port == '') port = 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
    console.log('http://localhost:3000')
})
