import { Router } from 'express'
import { addBookToUser, addBooksIfNotOnDB, getUserBookshelf, getBookFromDB } from '../controllers/bookController.js'
import { getReviews } from '../controllers/reviewController.js'

export const bookRouter = Router()

bookRouter.post('/add', addBookToUser)
bookRouter.post('/add-search', addBooksIfNotOnDB)
bookRouter.get('/reviews/:id', getReviews)
bookRouter.get('/bookshelf/:id', getUserBookshelf)
bookRouter.get('/book/:id', getBookFromDB)
