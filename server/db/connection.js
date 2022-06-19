import { Pool, Client } from 'pg'

const config = {
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'password',
  database: 'postgres',
}

export const getDbConnection = () => {
  const url = process.env.DATABASE_URL
  let pool
  if (url == null || url == '') {
    pool = new Pool(config)
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
