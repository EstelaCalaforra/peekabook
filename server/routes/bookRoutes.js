import { Router } from 'express'
import { addBookToUser, addBooksIfNotOnDB } from '../controllers/bookController.js'
import { getReviews } from '../controllers/reviewController.js'

export const bookRouter = Router()

bookRouter.post('/add', addBookToUser)
bookRouter.post('/add-search', addBooksIfNotOnDB)
bookRouter.get('/reviews/:id', getReviews)
