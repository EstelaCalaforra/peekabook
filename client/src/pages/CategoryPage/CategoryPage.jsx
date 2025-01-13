import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './CategoryPage.css'
import { useBookshelf } from '../../hooks/useBookshelf'
import i18next from 'i18next'

export function CategoryPage() {
  const location = useLocation()
  const category = location.state
  const { bookshelfData, hasBooks, handleClickOnCover, deleteBookFromBookshelf, fetchBookshelfData } = useBookshelf()

  const defaultImageUrl = 'https://birkhauser.com/product-not-found.png';

  async function handleDeleteBook(book) {
    await deleteBookFromBookshelf(book)
  }

  useEffect(() => {
    fetchBookshelfData()
  }, [])

  return (
    <main className="category-page">
      <h1>{category?.charAt(0).toUpperCase() + category?.slice(1)} {i18next.t('Shelf')}</h1>
      <div className="row">
        {bookshelfData
          .filter((book) => book.categories && book.categories.includes(category))
          .map((book) => (
            <li key={book.id_api} className="book">
              <img className="cover" src={book?.cover || defaultImageUrl} alt="Book cover" />
              <div className="info">
                <div className="title-author">
                  <h2>{book?.title || 'No title available'}</h2>
                  <p className="author">{book?.authors?.[0] || 'Unknown author.'}</p>
                </div>
                <div className="read-more">
                  <button className="delete-icon" onClick={() => handleDeleteBook(book)} />
                  <a onClick={() => handleClickOnCover(book?.id_api)} className="button">
                    {i18next.t('Read more')}
                  </a>
                </div>
              </div>
            </li>
          ))}
      </div>
    </main>
  );
}
