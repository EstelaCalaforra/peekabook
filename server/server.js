import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// Routers
import { bookRouter } from './routes/bookRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { externalAPIRouter } from './routes/externalAPIRoutes.js'

// Starting the server
const app = express()
const port = process.env.PORT

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Google Books, Recite, NYT Bestsellers
app.use('/api/external', externalAPIRouter)

// GET, POST books in DDBB
app.use('/api/books', bookRouter)

// Login and Signup
app.use('/api/users', userRouter)

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', port)
})
