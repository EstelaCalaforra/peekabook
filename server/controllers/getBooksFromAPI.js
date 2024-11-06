import { Router } from 'express'
import axios from 'axios'

export const getBooksFromAPIRouter = Router()

getBooksFromAPIRouter.get('/', async (req, res) => {
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
    const { items } = response.data
    res.json(items)
  } catch (error) {
    console.log(error)
  }
})
