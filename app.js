import Koa from 'koa'
import koaBody from 'koa-body'
import render from 'koa-ejs'
import { fileURLToPath } from 'url'
import path from 'path'
import serve from 'koa-static'
import { getRouter } from './server/routers/router.js'
import { getDbConnection } from './server/db/connection.js'

export const client = await getDbConnection()

console.log('dvfvf')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = new Koa()
app.use(serve(__dirname + '/public'))

render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'html',
})

app.use(koaBody()).use(getRouter().routes())

let port = process.env.PORT
if (port == null || port == '') port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
  console.log('http://localhost:3000')
})
