import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const { categories, setCategories, setBookId } = useContext(BookSearchContext)
  const { userId } = useAuth()

  async function getCategories (response) {
    const cleanedData = response.map(book => {
      // Limpiamos y convertimos el campo `categories` en un array
      if (book.categories) {
        book.categories = book.categories
          .replace(/^{|}$/g, '') // Eliminar las llaves `{}` al inicio y final
          .split(',') // Dividir en elementos individuales
          .map(category => category.trim().replace(/^"|"$/g, '')) // Eliminar comillas
          .filter(category => category) // Eliminar categorías vacías
      } else {
        book.categories = [] // Si es `null`, lo convertimos en un array vacío
      }
      return book
    })
    console.log({ cleanedData })
    setBookshelfData(cleanedData)
    const allCategories = [
      ...new Set(cleanedData.flatMap(book => book.categories))
    ]
    console.log({ allCategories })
    console.log({ bookshelfData })
    return allCategories
  }

  // fetch books in database the first time the component is rendered
  useEffect(() => {
    const fetchBookshelfData = async () => {
      try {
        console.log({ userId })

        const response = await axios.get('http://localhost:5000/get-bookshelf/user/' + userId)
        const resDataGetBooks = response.data

        // If there are books in the response, set the bookshelf data and update hasData
        if (resDataGetBooks && resDataGetBooks.length > 0) {
          setHasData(true) // Update hasData only if there is valid data
          const allCategories = await getCategories(resDataGetBooks)
          setCategories(allCategories)
          console.log({ allCategories })
          console.log({ bookshelfData })
        } else {
          setHasData(false) // Ensure hasData is false if no data is received
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookshelfData()
  }, [])

  const navigate = useNavigate()
  function handleClickOnCover (idApi) {
    setBookId(idApi)
    navigate('/ind-book/' + idApi)
  }

  function handleClickOnCategory ({ category }) {
    console.log({ category })
    navigate(`/bookshelf/${userId}/${category}`, { state: category })
  }

  return (
    <div className='bookshelf-page'>
      {hasData && (
        <div className='bookshelf-shelves'>
          {[...new Set(categories)].map((category) => {
            // Filtrar los libros que coinciden con la categoría actual
            const booksInCategory = bookshelfData.filter((book) =>
              book.categories && book.categories.includes(category) // Verifica si el libro tiene la categoría actual
            )

            // No renderizar si no hay libros en la categoría
            if (booksInCategory.length === 0) {
              return null
            }

            return (
              <div key={category} className='bookshelf-column'>
                <a onClick={() => handleClickOnCategory({ category })}><h3>{category}</h3></a>
                <img src={Divider} className='bookshelf-divider' alt='divider' />
                <div className='bookshelf-row'>
                  {booksInCategory.map((book) => (
                    <a key={book.id_api}>
                      <img
                        className='bookshelf-cover'
                        src={book.cover}
                        alt={book.title}
                        onClick={() => handleClickOnCover(book.id_api)}
                      />
                    </a>
                  ))}
                  {/* <a href={`/bookshelf/${userId}/${category}`}><img src={RightArrow} className='bookshelf-arrow' alt='arrow' /></a> */}
                  <a onClick={() => handleClickOnCategory({ category })}><img src={RightArrow} className='bookshelf-arrow' alt='arrow' /></a>
                </div>
                <img src={Shelf} className='bookshelf-shelf' alt='shelf' />
              </div>
            )
          })}
        </div>
      )}

      {!hasData && (
        <div className='no-books'>
          <p>You haven&apos;t added any books yet. Search for one!</p>
        </div>
      )}
    </div>
  )
}
