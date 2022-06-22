import Router from 'koa-router'
import { client } from '../../app.js'

export const getBooksRouter = () => {
  const router = new Router()
  router.post('/books', async (ctx) => {
    const title = ctx.request.body.title
    const author = ctx.request.body.author
    ctx.body = ctx.request.body

    const result = await client.query(
      `insert into Books (title, author) values ($1, $2)`,
      [title, author]
    )
    ctx.body = 'You succesfully added a new book'
  })

  router.get('/db', async (ctx) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM Books')
      const results = { results: result ? result.rows : null }
      ctx.body = JSON.stringify(results)
      client.release()
    } catch (err) {
      console.error(err)
      ctx.body = 'Error ' + err
    }
  })
  return router
}
