import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Book from './components/Book'
import Filter from './components/Filter'

import axios from 'axios'


const App = () => {
  const [books, setBooks] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newGenre, setNewGenre] = useState('')
  const [newPublished_at, setNewPublished_at] = useState('')

  const [searchBook, setSearchBook] = useState([])
  const [result, setResult] = useState([])
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3002/api/books')
      .then(response => {
        console.log('promise fulfilled')
        setBooks(response.data)
      })
  }, [])



  const addBook = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)

    const bookObject = {
      title: newTitle,
      author: newAuthor, 
      genre: newGenre,
      published_at: newPublished_at,
      onStock: true,
      id: (books.length + 1).toString
    }
/*
    setBooks(books.concat(bookObject))
    setNewTitle('')
    setNewAuthor('')
    setNewGenre('')
    setNewPublished_at('')
    setNewQuantity('')
*/
    axios
    .post('http://localhost:3002/api/books', bookObject)
    .then(response => {
      setBooks(books.concat(response.data))
      setNewTitle('')
      setNewAuthor('')
      setNewGenre('')
      setNewPublished_at('')
      setNewQuantity('')
    })


  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleGenreChange = (event) => {
    console.log(event.target.value)
    setNewGenre(event.target.value)
  }

  const handlePublished_atChange = (event) => {
    console.log(event.target.value)
    setNewPublished_at(event.target.value)
  }



  const onSearchBook = (e) => {
    setSearchBook(e.target.value)     
}

  const filterBook = (e) => {
    e.preventDefault()
    console.log('filter me',e.target)
    const result = books.filter(book => book.genre.toLowerCase().includes(searchBook.toLowerCase()))

      console.log('result',result)
      setResult(result)
      setSearchBook('')
 
      if(result.length === 0 ) {
        alert('No book found')
      }

}

const toggleStockOf = id => {
  const url = `http://localhost:3002/api/books/${id}`
  const book = books.find(n => n.id === id)
  const changedBook = { ...book, onStock: !book.onStock }

  axios.put(url, changedBook).then(response => {
    setBooks(books.map(n => n.id !== id ? n : response.data))
  })
}

const deleteBook = (id) => {
  console.log('note of ' + id + ' needs to be deleted')
  const url = `http://localhost:3002/api/books/${id}`
  axios.delete(url).then(response => {    
    setBooks(books.filter(n => n.id !== id))
   })
}




  return (
    <>
    <h1>Books Inventory Management System</h1>
    <ul>
      {books.map(book=> 
        <Book key={book.id} book={book} toggleStock={() => toggleStockOf(book.id)}  deleteBook={()=>deleteBook(book.id)}/>
      )}
    </ul>
    
    <form onSubmit={addBook}>
      <input type="text" placeholder="Title" value ={newTitle} onChange={handleTitleChange} required />
      <input type="text" placeholder="Author" value={newAuthor} onChange={handleAuthorChange} required/>
      <input type="text" placeholder="Genre" value={newGenre} onChange={handleGenreChange} required/>
      <input type="text" placeholder="Published_at" value={newPublished_at} onChange={handlePublished_atChange} required/>
      
      <button type="submit">Add Book</button>
    </form>
    
    <form onSubmit={filterBook}>
      <input type="text" placeholder="search" value={searchBook} onChange= {onSearchBook} required/>
      <button type='submit'>FilterBy genre</button>
    </form>
    <ul>
      {result.map( book => <Filter key={book.id} book={book} />)}
    </ul>

    </>
  )
}
export default App
