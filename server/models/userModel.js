import { db } from '../config/dbConfig.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const saltRounds = 10

export const getUserByEmail = async (email) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}

export const verifyToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET
  )
}

export const authenticateUser = async (email, password) => {
  const user = await getUserByEmail(email)
  if (!user) {
    return null
  }

  const isPasswordValid = await comparePassword(password, user.password)
  if (!isPasswordValid) {
    return null
  }

  // If everything ok, generate auth token
  const token = generateToken(user)
  return { user, token }
}

export const registerUser = async (email, password) => {
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return null
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  try {
    const result = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    )
    return { id: result.rows[0].id, email }
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}
