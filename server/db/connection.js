import pg from 'pg'

const config = {
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'password',
  database: 'postgres',
}

export const getDbConnection = async () => {
  const { Client } = pg
  const url = process.env.DATABASE_URL
  let client
  if (url == null || url == '') {
    client = new Client(config)
  } else {
    client = new Client({
      connectionString: url,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }
  console.log('dvdfvdf\n\n\n')
  await client.connect()
  await client.query(`
    CREATE TABLE IF NOT EXISTS "Books" (
	    "id" SERIAL NOT NULL PRIMARY KEY,
	    "author" VARCHAR(50) NOT NULL,
	    "title" VARCHAR(50) NOT NULL,
    );`)
  return client
}
