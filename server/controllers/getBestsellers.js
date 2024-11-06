import { Router } from 'express'
import axios from 'axios'

export const getBestsellersRouter = Router()

getBestsellersRouter.get('/', async (req, res) => {
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
})
