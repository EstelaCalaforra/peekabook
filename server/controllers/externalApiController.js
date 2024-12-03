import axios from 'axios'
import { transformProduct } from '../helpers/externalAPIHelper.js'

export const fetchBooks = async (req, res) => {
  const { bookQuery, startIndex = 0, maxResults = 10 } = req.query
  console.log({ bookQuery, startIndex, maxResults })
  try {
    const params = {
      q: bookQuery,
      orderBy: 'relevance',
      printType: 'books',
      // langRestrict: 'en',
      startIndex: parseInt(startIndex), // initial index for pagination
      maxResults: parseInt(maxResults) // results per page
    }
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { params })
    // const books = response.data.map(transformAndValidateProduct)
    const { items, totalItems } = response.data
    res.json({ items, totalItems }) // send total items to calculate the total pages
  } catch (error) {
    console.log(error.message)
    res.status(500).render('error', { message: 'Error fetching books.' })
  }
}

export const getBestsellers = async (req, res) => {
  try {
    const params = {
      'api-key': 'WdGDKFTLRAMvyfPT3LVHZAAUiEaImG0W'
    }
    const response = await axios.get('https://api.nytimes.com/svc/books/v3/lists/overview.json', { params })
    const bestSellers = response.data
    res.json(bestSellers)
  } catch (error) {
    console.log(error)
  }
}

export const getRandomQuote = async (req, res) => {
  try {
    const response = await axios.get('https://recite.onrender.com/api/v1/random')
    const quote = response.data
    res.json(quote)
  } catch (error) {
    console.log(error)
  }
}
