import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// Routers
import { loginRouter } from './controllers/login.js'
import { signupRouter } from './controllers/signup.js'
import { addBookRouter } from './controllers/addBook.js'
import { addResultsToDBRouter } from './controllers/addResultsToDB.js'
import { getRandomQuoteRouter } from './controllers/getRandomQuote.js'
import { getBooksFromAPIRouter } from './controllers/getBooksFromAPI.js'
import { getBestsellersRouter } from './controllers/getBestsellers.js'
import { getBookshelfRouter } from './controllers/getBookshelf.js'

// Starting the server
const app = express()
const port = 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Signup
app.use('/signup', signupRouter)

// Login
app.use('/login', loginRouter)

// Add book to user (database)
app.use('/api/add-books/user/:id', addBookRouter)

// Add book search results to database if not already on it (database)
app.use('/api/add-results-to-db', addResultsToDBRouter)

// Recite API (external api) IT IS NOT CORRECT
app.use('/get-random-quote', getRandomQuoteRouter)

// Google Books API (external api)
app.use('/get-books-google-api', getBooksFromAPIRouter)

app.use('/get-bestsellers', getBestsellersRouter)

app.use('/get-bookshelf/user', getBookshelfRouter)

app.use('/api', getBookshelfRouter)

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', port)
})
