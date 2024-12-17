import { Router } from 'express'
import { addBookToUser, addBooksIfNotOnDB, getUserBookshelf, getBookFromDB, updateUserBookshelf, deleteBookFromUserBookshelf } from '../controllers/bookController.js'
import { getReviews, deleteReview, updateReview } from '../controllers/reviewController.js'
import { verifyAuthToken } from '../middleware/authMiddleware.js'

export const bookRouter = Router()

// Info en base de datos
bookRouter.post('/add-search', addBooksIfNotOnDB)
bookRouter.get('/reviews/:id', getReviews)
bookRouter.get('/book/:id', getBookFromDB)
bookRouter.delete('/reviews/:id', deleteReview)
bookRouter.delete('/remove/:userId/:bookId', verifyAuthToken, deleteBookFromUserBookshelf)

// Específicos para usuario
bookRouter.get('/bookshelf/:id', verifyAuthToken, getUserBookshelf)
bookRouter.post('/add', verifyAuthToken, addBookToUser)
bookRouter.put('/update-bookshelf/:userId', verifyAuthToken, updateUserBookshelf)

// Nueva ruta PUT para actualizar la reseña
bookRouter.put('/reviews/:id', verifyAuthToken, updateReview)
