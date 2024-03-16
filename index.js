const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.static('dist'))

let books = [
    {
        id: 1,
        title: "To kill a mockingbird",
        author:"Harper Lee", 
        genre:"classic",
        published_at: "1960-07-11",
        onStock: true
    },
    {
        id: 2,
        title: "The great Gatsby",
        author:"F. Scott Fitzgerald", 
        genre:"Fiction",
        published_at: "1925-04-10",
        onStock: true
      },   
     
    {
        id: 3,
        title: "Animal Farm",
        author:"George Orwell", 
        genre:"Political Satire",
        published_at: "1945-08-17",
        onStock: true
      },
  ]

  

  app.get("/", (request,response)=> {
    response.send("Welcome to the book store")
})

  app.get("/api/books", (request,response)=> {
    response.json(books)
})

//Fetch a single book

app.get("/api/books/:id", (request,response)=> {
    const id = Number(request.params.id)
    
    const book = books.find(book => book.id === id)
    if(book){
        response.json(book) 
    }
    else {
        response.status(404).end()
    }
}
)

//Delete a book

app.delete("/api/books/:id", (request,response)=> {
    const id = Number(request.params.id)
    books = books.filter(book => book.id !== id)
    response.status(204).end()
})

//Add a book
app.use(express.json())
app.post("/api/books", (request,response)=> {
    const maxId = books.length > 0
    ? Math.max(...books.map(n => n.id)) 
    : 0

  const book = request.body;
  book.id = maxId + 1 ;

  if(!book.title){
      return response.status(400).json({error: "content missing"})
  }

  books = books.concat(book)
  response.json(book)
})

//Update a book by quantity

app.put("/api/books/:id", (request,response)=> {
    const id = Number(request.params.id)
    const body = request.body
    books = books.map(book => book.id !== id ? book : body)
    response.json(body)
})



const PORT = process.env.PORT || 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


//Error handling middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


