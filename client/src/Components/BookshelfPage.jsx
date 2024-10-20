import { useState, useEffect, useContext } from 'react'
import './styles/BookshelfPage.css'
import axios from 'axios'
import Shelf from '../assets/shelf.png'
import RightArrow from '../assets/right-arrow.png'
import Divider from '../assets/botanical-divider-crop.png'
import { BookSearchContext } from '../context/bookSearchContext'

export function BookshelfPage () {
  // fetch the get-bookshelf route (database)
  const [bookshelfData, setBookshelfData] = useState([{}])
  const { categories, setCategories } = useContext(BookSearchContext)

  async function getCategories (response) {
    const allCategories = response.map((element) => element.category)
    const allCategoriesFiltered = [...new Set(allCategories)]
    return allCategoriesFiltered
  }

  // fetch books in database first time the component is rendered
  useEffect(() => {
    const fetchBookshelfData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-bookshelf')
        const resDataGetBooks = response.data
        console.log({ resDataGetBooks })
        setBookshelfData(response.data)
        const allCategories = await getCategories(response.data)
        setCategories(allCategories)
        console.log({ allCategories })
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookshelfData()
  }, [])

  return (
    <div className='bookshelf-shelves'>
      {[...new Set(categories)].map((category) => {
        // filter books that match current category
        const booksInCategory = bookshelfData.filter((book) => book.category === category)

        // no render if no books in category
        if (booksInCategory.length === 0) {
          return null
        }

        return (
          <div key={category} className='bookshelf-column'>
            <h3>{category}</h3>
            <img src={Divider} className='bookshelf-divider' />
            <div className='bookshelf-row'>
              {booksInCategory.map((book) => (
                <a key={book.id} href='/ind-book'>
                  <img key={book.id} className='bookshelf-cover' src={book.cover} />
                </a>
              ))}
              <img src={RightArrow} className='bookshelf-arrow' />
            </div>
            <img src={Shelf} className='bookshelf-shelf' />
          </div>
        )
      })}
    </div>
  )
}
