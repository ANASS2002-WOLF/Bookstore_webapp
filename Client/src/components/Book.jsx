

const Book =({book,toggleStock,deleteBook}) =>{
    const label = book.onStock
    ? 'on Stock' : 'out of stock'

    return (
        <>
        <li>

            {book.title} || {book.author} || {book.genre} || {book.published_at} ||
            <button onClick={toggleStock}>{label}</button>
            <button onClick= {deleteBook}>Delete</button>
             
        </li>
        </>
    )
}

export default Book