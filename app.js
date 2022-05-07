import Koa from 'koa'
import Router from 'koa-router'
import render from 'koa-ejs'
import { fileURLToPath } from 'url';
import path from 'path';
import serve from 'koa-static'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

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

router.get('/db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = { 'results': (result) ? result.rows : null };
        res.render('pages/db', results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

app.use(router.routes())

let port = process.env.PORT
if (port == null || port == '') port = 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
