const Filter = ({book}) => {
    return (
        <>
        <li>
            {book.title} || {book.author} || {book.genre} || {book.published_at}
        </li>
        </>
    )
}

export default Filter