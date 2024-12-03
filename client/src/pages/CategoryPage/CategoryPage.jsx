import { useLocation } from 'react-router-dom'
import './CategoryPage.css'
import { useBookshelf } from '../../hooks/useBookshelf'

export function CategoryPage () {
  const location = useLocation()
  const category = location.state
  const { bookshelfData, hasBooks, handleClickOnCover, categories } = useBookshelf()

  console.log({ categories })
  return (
    <main className='category-page'>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} shelf</h2>
      {hasBooks && (
        <div className='shelves'>
          {[...new Set(categories)].map((category) => {
            // filter books that matches current category
            const booksInCategory = bookshelfData.filter((book) =>
              book.categories && book.categories.includes(category)
            )
            // no render if no books in category
            if (booksInCategory.length === 0) {
              return null
            }
            return (
              <div key={category} className=''>
                <div className='row'>
                  {booksInCategory.slice(-4).map((book) => (
                    <a key={book.id_api}>
                      <img
                        className='cover'
                        src={book.cover}
                        alt={book.title}
                        onClick={() => handleClickOnCover(book.id_api)}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
