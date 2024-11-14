import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ success: false, message: 'Access token required' })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token' })
    req.user = user
    next()
  })
}
