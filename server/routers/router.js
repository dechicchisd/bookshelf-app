import Router from 'koa-router'
import { getBooksRouter } from './bookRouter.js'
import { client } from '../../app.js'

export const getRouter = () => {
  const router = new Router()

  router.get('/', async (ctx) => {
    const result = await client.query('select * from books')
    // console.log(result.rows)
    await ctx.render('index', {
      title: 'Books',
      books: result.rows,
    })
  })

  router.use(getBooksRouter().routes())
  return router
}
