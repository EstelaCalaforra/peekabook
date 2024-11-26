import { Router } from 'express'
import { fetchBooks, getBestsellers } from '../controllers/externalApiController.js'

export const externalAPIRouter = Router()

externalAPIRouter.get('/search', fetchBooks)
externalAPIRouter.get('/bestsellers', getBestsellers)
