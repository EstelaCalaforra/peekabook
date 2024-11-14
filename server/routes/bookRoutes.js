// src/routes/bookRoutes.js
import { Router } from 'express'
import { addBookToUser, addBooksIfNotOnDB } from '../controllers/bookController.js'

export const bookRouter = Router()

bookRouter.post('/add', addBookToUser)
bookRouter.post('/add-search', addBooksIfNotOnDB)
