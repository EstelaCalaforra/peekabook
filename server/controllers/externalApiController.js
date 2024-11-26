import axios from 'axios'
import { transformProduct } from '../helpers/externalAPIHelper.js'

export const fetchBooks = async (req, res) => {
  const { bookQuery } = req.query
  console.log({ bookQuery })
  try {
    const params = {
      q: bookQuery,
      orderBy: 'relevance',
      printType: 'books',
      langRestrict: 'en',
      maxResults: 10
    }
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { params })
    // const books = response.data.map(transformAndValidateProduct)
    const { items } = response.data
    res.json(items)
  } catch (error) {
    console.log(error.message)
    res.status(500).render('error', { message: 'Error fetching books.' })
  }
}
