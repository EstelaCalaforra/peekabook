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
      const consult = response.data
      console.log({ consult })
      console.log({ bookSearch })

      // Cambia el forEach por un for...of
      for (const book of bookSearch) {
        // Usa === para comparación
        if (book.id !== response.data.id_api) {
          const bookData = {
            id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            description: book.volumeInfo.description,
            cover: book.volumeInfo?.imageLinks?.smallThumbnail || defaultImageUrl
          }

          // Ahora puedes usar await aquí
          const addResponse = await fetch('http://localhost:5000/api/add-books/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookData }) // apis handle data in json format
          })

          // Puedes manejar la respuesta de la API aquí si es necesario
          const result = await addResponse.json()
          console.log({ result }) // Muestra el resultado de la inserción si es necesario
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchBooksGoogleAPI (bookQuery) {
    try {
      const params = {
        q: bookQuery,
        orderBy: 'relevance',
        printType: 'books',
        langRestrict: 'en',
        maxResults: 10
      }
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { params })
      const { items } = response.data
      setBookSearch(items)
      setLoading(false)
      console.log({ bookSearch })
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
