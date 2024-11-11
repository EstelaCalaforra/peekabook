import { useState, useEffect, useContext } from 'react'
import './styles/BookshelfPage.css'
import axios from 'axios'
import Shelf from '../assets/shelf.png'
import RightArrow from '../assets/right-arrow.png'
import Divider from '../assets/botanical-divider-crop.png'
import { BookSearchContext } from '../context/bookSearchContext'
import { useAuth } from '../context/AuthContext'

export function BookshelfPage () {
  // fetch the get-bookshelf route (database)
  const [bookshelfData, setBookshelfData] = useState([])
  const [hasData, setHasData] = useState(false)
  const { categories, setCategories } = useContext(BookSearchContext)
  const { userId } = useAuth()

  async function getCategories(response) {
    const allCategories = response.map((element) => element.category)
    const allCategoriesFiltered = [...new Set(allCategories)]
    return allCategoriesFiltered
  }

  // fetch books in database the first time the component is rendered
  useEffect(() => {
    const fetchBookshelfData = async () => {
      try {
        console.log({ userId })

        const response = await axios.get('http://localhost:5000/get-bookshelf/user/' + userId)
        const resDataGetBooks = response.data

        console.log({ resDataGetBooks })

        // If there are books in the response, set the bookshelf data and update hasData
        if (resDataGetBooks && resDataGetBooks.length > 0) {
          setBookshelfData(resDataGetBooks)
          setHasData(true) // Update hasData only if there is valid data
          const allCategories = await getCategories(resDataGetBooks)
          setCategories(allCategories)
          console.log({ allCategories })
        } else {
          setHasData(false) // Ensure hasData is false if no data is received
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookshelfData()
  }, [])

  return (
    <div>
      {hasData ? (
        <div className="bookshelf-shelves">
          {[...new Set(categories)].map((category) => {
            // Filter books that match the current category
            const booksInCategory = bookshelfData.filter(
              (book) => book.category === category
            );

            // No render if no books in category
            if (booksInCategory.length === 0) {
              return null;
            }

            return (
              <div key={category} className="bookshelf-column">
                <h3>{category}</h3>
                <img src={Divider} className="bookshelf-divider" />
                <div className="bookshelf-row">
                  {booksInCategory.map((book) => (
                    <a key={book.id} href="/ind-book">
                      <img
                        className="bookshelf-cover"
                        src={book.cover}
                        alt={book.title}
                      />
                    </a>
                  ))}
                  <img src={RightArrow} className="bookshelf-arrow" />
                </div>
                <img src={Shelf} className="bookshelf-shelf" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className='no-books'>
          <p>You haven&apos;t added any books yet. Search for one!</p>
        </div>
      )}
    </div>
  );
}
