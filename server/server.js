import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as path from 'path'
// Routers
import { bookRouter } from './routes/bookRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { externalAPIRouter } from './routes/externalAPIRoutes.js'

// Starting the server
const app = express()
const port = 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Google Books, Recite, NYT Bestsellers
app.use('/api/external', externalAPIRouter)

// GET, POST books in DDBB
app.use('/api/books', bookRouter)

// Login and Signup
app.use('/api/users', userRouter)

// Redirect all not found paths to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', port)
})
