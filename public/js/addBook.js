let books = []
let nome = document.getElementById('name')
let author = document.getElementById('author')
let form = document.getElementById('form')

form.addEventListener('submit', () => {
    books.push({
        name: nome.value,
        author: author.value
    })

    books.forEach(element => {
        console.log(element)
    });
})