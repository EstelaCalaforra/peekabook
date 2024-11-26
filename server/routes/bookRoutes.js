import { Router } from 'express'
import { addBookToUser, addBooksIfNotOnDB, getReviews } from '../controllers/bookController.js'

export const bookRouter = Router()

bookRouter.post('/add', addBookToUser)
bookRouter.post('/add-search', addBooksIfNotOnDB)
bookRouter.get('/reviews/:id', getReviews)
