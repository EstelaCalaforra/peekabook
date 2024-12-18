import { Router } from 'express'
import { addBookToUser, addBooksIfNotOnDB, getUserBookshelf, getBookFromDB, updateUserBookshelf, deleteBookFromUserBookshelf } from '../controllers/bookController.js'
import { getReviews, deleteReview, updateReview, getAllReviewsController } from '../controllers/reviewController.js'
import { verifyAuthToken } from '../middleware/authMiddleware.js'

export const bookRouter = Router()

// Info in database
bookRouter.post('/add-search', addBooksIfNotOnDB)
bookRouter.get('/reviews/:id', getReviews)
bookRouter.get('/book/:id', getBookFromDB)
bookRouter.get('/reviews', getAllReviewsController)

bookRouter.delete('/reviews/:id', deleteReview)
bookRouter.delete('/remove/:userId/:bookId', verifyAuthToken, deleteBookFromUserBookshelf)

bookRouter.put('/reviews/:id', verifyAuthToken, updateReview)

// Users
bookRouter.get('/bookshelf/:id', verifyAuthToken, getUserBookshelf)
bookRouter.post('/add', verifyAuthToken, addBookToUser)
bookRouter.put('/update-bookshelf/:userId', verifyAuthToken, updateUserBookshelf)
