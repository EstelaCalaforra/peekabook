import { Router } from 'express'
import { addBookToUser, addBooksIfNotOnDB, getUserBookshelf, getBookFromDB } from '../controllers/bookController.js'
import { getReviews } from '../controllers/reviewController.js'
import { verifyAuthToken } from '../middleware/authMiddleware.js'

export const bookRouter = Router()

// Info on database calls
bookRouter.post('/add-search', addBooksIfNotOnDB)
bookRouter.get('/reviews/:id', getReviews)
bookRouter.get('/book/:id', getBookFromDB)

// Specific to user calls
bookRouter.get('/bookshelf/:id', verifyAuthToken, getUserBookshelf)
bookRouter.post('/add', verifyAuthToken, addBookToUser)
