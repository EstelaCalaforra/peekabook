import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// Routers
import { getRandomQuoteRouter } from './controllers/getRandomQuote.js'
import { getBestsellersRouter } from './controllers/getBestsellers.js'
import { getBookshelfRouter } from './controllers/getBookshelf.js'
import { getBookFromDBRouter } from './controllers/getBookFromDB.js'
import { bookRouter } from './routes/bookRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { externalAPIRouter } from './routes/externalAPIRoutes.js'

// Starting the server
const app = express()
const port = 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Recite API (external api) IT IS NOT CORRECT
app.use('/get-random-quote', getRandomQuoteRouter)

app.use('/api/get-book', getBookFromDBRouter)

app.use('/get-bestsellers', getBestsellersRouter)

app.use('/get-bookshelf/user', getBookshelfRouter)

// Google Books API (external api)
app.use('/api/external', externalAPIRouter)

// GET, POST books related info
app.use('/api/books', bookRouter)

// Login and Signup
app.use('/api/users', userRouter)

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', port)
})
