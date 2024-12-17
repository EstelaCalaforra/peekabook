import { Router } from 'express'
import { loginUser, signupUser } from '../controllers/userController.js'
import { verifyAuthToken } from '../middleware/authMiddleware.js'

export const userRouter = Router()

userRouter.post('/login', loginUser)
userRouter.post('/signup', signupUser)
userRouter.get('/verify-token', verifyAuthToken, (req, res) => {
  res.json({ success: true, message: 'Token is valid' })
})
