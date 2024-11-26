import { Router } from 'express'
import { fetchBooks } from '../controllers/externalApiController.js'

export const externalAPIRouter = Router()

externalAPIRouter.get('/search', fetchBooks)
