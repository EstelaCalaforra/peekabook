import bcrypt from 'bcrypt'
import pg from 'pg'
import * as dotenv from 'dotenv'
import { Router } from 'express'
import jwt from 'jsonwebtoken'

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

export const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    // Consult to the database
    const user = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (user.rows.length > 0) {
      // User found, check if hashed password matches form password
      const hashedPassword = user.rows[0].password
      bcrypt.compare(password, hashedPassword, async (_err, same) => {
        if (same) {
          const userForToken = {
            id: user.rows[0].id,
            email: user.rows[0].email
          }
          // Sign the token
          const token = jwt.sign(userForToken, process.env.JWT_SECRET)
          res.status(200).json({ success: true, message: 'Login successful!', userId: user.rows[0].id, token })
        } else {
          // We dont want to give the user (potential hacker) too much info (though we now only the password is wrong)
          res.status(401).json({ success: false, message: 'Wrong email or password. Please try again.' })
        }
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})
