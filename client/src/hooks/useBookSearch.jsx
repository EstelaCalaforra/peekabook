import { useState, useContext } from 'react'
import axios from 'axios'
import { BookSearchContext } from '../context/bookSearchContext'

const defaultImageUrl = 'https://birkhauser.com/product-not-found.png' // this img is not free use oopsie

export function useBookSearch () {
  const [loading, setLoading] = useState(true)
  const { setBookSearch, bookSearch, bookId } = useContext(BookSearchContext)

  async function addToDatabase (bookSearch) {
    try {
      const response = await axios.get('http://localhost:5000/get-bookshelf')
      const consult = response.data // Lista de libros en la base de datos
      console.log({ consult })
      console.log({ bookSearch })

      // Filtra los libros que no están en la base de datos
      const booksToAdd = bookSearch.filter(book =>
        !consult.some(dbBook => dbBook.id_api === book.id)
      )

      // Crea un array de promesas para añadir libros en paralelo
      const addPromises = booksToAdd.map(async (book) => {
        const bookData = {
          id: book.id,
          title: book.volumeInfo.title,
          pubYear: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : null,
          authors: book.volumeInfo.authors ? book.volumeInfo.authors : 'Unknown Author',
          description: book.volumeInfo.description || 'No description available',
          cover: book.volumeInfo.imageLinks?.smallThumbnail || defaultImageUrl
        }
        console.log({ bookData })

        // Inserta el libro en la base de datos
        const addResponse = await fetch('http://localhost:5000/api/add-results-to-db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ bookData })
        })

        const result = await addResponse.json()
        console.log({ result })
        return result
      })

      // Ejecuta todas las promesas en paralelo
      const results = await Promise.all(addPromises)
      console.log('Libros añadidos:', results)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchBooksGoogleAPI (bookQuery) {
    try {
      const response = await axios.get('http://localhost:5000/get-books-google-api', {
        params: {
          bookQuery
        }
      })
      console.log(response.data)
      const items = response.data
      setBookSearch(items)
      setLoading(false)
      console.log({ items })
      addToDatabase(items)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  function findIndexById (array, id) {
    const findedIndex = array.findIndex(elemento => elemento.id === id)
    return findedIndex
  }

  const findedIndex = findIndexById(bookSearch, bookId)

  async function setBooksGoogleAPI (bookQuery) {
    await fetchBooksGoogleAPI(bookQuery)
  }

  return { setBooksGoogleAPI, findedIndex }
}
