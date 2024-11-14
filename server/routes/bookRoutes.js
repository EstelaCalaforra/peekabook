// src/routes/bookRoutes.js
import { Router } from 'express'
import { addBookToUser } from '../controllers/bookController.js'

export const bookRouter = Router()

bookRouter.post('/add', addBookToUser)
