import { verifyToken } from '../models/userModel.js'

export const verifyAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authorization header missing' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token missing' })
  }

  try {
    const decoded = verifyToken(token)
    console.log({ decoded })
    req.user = decoded
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    return res.status(403).json({ success: false, message: 'Invalid or expired token' })
  }
}
