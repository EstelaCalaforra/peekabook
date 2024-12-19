import ShelfImg from '../../assets/shelf.png'
import RightArrow from '../../assets/right-arrow.png'

export function Shelf ({ category, booksInCategory, handleClickOnCategory, handleClickOnCover }) {
  return (
    <div className='bookshelf-column-shelf'>
      <a onClick={() => handleClickOnCategory({ category })}>
        <h3 className='shelf-title'>⚪{category}</h3>
      </a>
      <div className='row'>
        {booksInCategory.slice(-6).map((book) => (
          <a key={book.id_api}>
            <img
              className='cover'
              src={book.cover}
              alt={book.title}
              onClick={() => handleClickOnCover(book.id_api)}
            />
          </a>
        ))}
        <a onClick={() => handleClickOnCategory({ category })}>
          <img src={RightArrow} className='arrow' alt='arrow' />
        </a>
      </div>
      {/* <img src={ShelfImg} className='shelf' alt='shelf' /> */}
    </div>
  )
}
