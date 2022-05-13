import Router from 'koa-router'
import { getBooksRouter } from './bookRouter.js'
import { getDbConnection } from '../db/connection.js'

export const getRouter = () => {
  const router = new Router()

  const pool = getDbConnection()

  router.get('/', async (ctx) => {
    const client = await pool.connect()
    const result = await client.query('select * from books')
    console.log(result.rows)
    await ctx.render('index', {
      title: 'Books',
      books: result.rows,
    })
  })

  router.use(getBooksRouter().routes())
  return router
}
