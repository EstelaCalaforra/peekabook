export function BookInShelf ({ book, handleClickOnCover }) {
  return (
    <a key={book.id_api} onClick={() => handleClickOnCover(book.id_api)}>
      <img
        className='cover'
        src={book.cover}
        alt={book.title}
      />
    </a>
  )
}
