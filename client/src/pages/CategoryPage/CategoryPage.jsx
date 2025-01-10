import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CategoryPage.css';
import { useBookshelf } from '../../hooks/useBookshelf';

export function CategoryPage() {
  const location = useLocation();
  const category = location.state;
  const { bookshelfData, hasBooks, handleClickOnCover, deleteBookFromBookshelf, fetchBookshelfData } = useBookshelf();
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewOption, setViewOption] = useState('bookshelves'); // Default to "Bookshelves"

  const defaultImageUrl = 'https://birkhauser.com/product-not-found.png';

  async function handleDeleteBook(book) {
    await deleteBookFromBookshelf(book);
  }

  useEffect(() => {
    fetchBookshelfData();
  }, []);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleViewChange = (option) => {
    setViewOption(option);
    setShowDropdown(false);
  };

  return (
    <main className="category-page">
      <h1>{category?.charAt(0).toUpperCase() + category?.slice(1)} Shelf</h1>

      {/* Dropdown for mobile */}
      <div className="view-dropdown-container">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          View: {viewOption === 'bookshelves' ? 'Bookshelves' : 'Recent Reviews'}
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => handleViewChange('bookshelves')}>
              Bookshelves
            </button>
            <button className="dropdown-item" onClick={() => handleViewChange('recentreviews')}>
              Recent Reviews
            </button>
          </div>
        )}
      </div>

      {viewOption === 'bookshelves' && hasBooks && (
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
                      Read more
                    </a>
                  </div>
                </div>
              </li>
            ))}
        </div>
      )}

      {viewOption === 'recentreviews' && (
        <div className="recent-reviews">
          {/* Placeholder for displaying recent reviews (to be implemented) */}
          <p>Recent Reviews (to be implemented)</p>
        </div>
      )}
    </main>
  );
}
