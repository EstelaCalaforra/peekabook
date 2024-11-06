import bcrypt from 'bcrypt'
import pg from 'pg'
import * as dotenv from 'dotenv'
import { Router } from 'express'

dotenv.config()

// Database
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})
db.connect()

export const signupRouter = Router()

signupRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    // check if user exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email])

    if (userExists.rows.length > 0) {
      return res.json({ success: false, message: 'User already exists' })
    }

    // insert new user with hashed password
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const response = await db.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, hash])
      res.json({ success: true, message: err, userId: response.rows[0].id })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})
