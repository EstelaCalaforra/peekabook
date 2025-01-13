import RightArrow from '../../assets/right-arrow.png'
import i18next from 'i18next'

export function Shelf ({ category, booksInCategory, handleClickOnCategory, handleClickOnCover }) {
  return (
    <div className='bookshelf-column-shelf'>
      <div className='title-row'>
        <h3 className='shelf-title'>⚪{category}</h3>
        <a className='full-shelf' onClick={() => handleClickOnCategory({ category })}>{i18next.t('Full shelf')}</a>
      </div>
      <div className='row'>
        {booksInCategory.slice(-5).map((book) => (
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
    </div>
  )
}
