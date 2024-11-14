import { Router } from 'express'
import { loginUser, signupUser } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.post('/login', loginUser)
userRouter.post('/signup', signupUser)
