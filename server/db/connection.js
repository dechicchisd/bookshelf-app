import pg from 'pg'

export const getDbConnection = () => {
  const { Pool } = pg
  const url = process.env.DATABASE_URL
  let pool
  if (url == null || url == '') {
    pool = new Pool({
      host: 'localhost',
      user: 'postgres',
      port: 5432,
      password: 'password',
    })
  } else {
    pool = new Pool({
      connectionString: url,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }
  return pool
}
