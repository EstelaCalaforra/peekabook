import { Router } from 'express'
import axios from 'axios'

export const getRandomQuoteRouter = Router()

getRandomQuoteRouter.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://recite.onrender.com/api/v1/random')
    const quote = response.data
    res.json(quote)
  } catch (error) {
    console.log(error)
  }
})
