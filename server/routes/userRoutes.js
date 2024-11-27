import { Router } from 'express'
import { loginUser, signupUser } from '../controllers/userController.js'
import { verifyAuthToken } from '../middleware/authMiddleware.js'

export const userRouter = Router()

userRouter.post('/login', loginUser)
userRouter.post('/signup', signupUser)

// Protected route to verify the token
userRouter.get('/verify', verifyAuthToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    user: req.user // decoded user data from token
  })
})
