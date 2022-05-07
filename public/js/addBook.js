let nome = document.getElementById('name')
let author = document.getElementById('author')
let form = document.getElementById('form')

form.addEventListener('submit', () => {

    const client = await pool.connect();
    const result = await client.query(`INSERT INTO Books (title, author)`, [nome, author]);
    console.log(result)
})