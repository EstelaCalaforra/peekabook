import express from 'express'
import cors from 'cors'
import pg from 'pg'
import bodyParser from 'body-parser'
import axios from 'axios'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'

// import { getBooks, getBookCover } from "./functions.js";

// important consts
const app = express()
const port = 5000

const saltRounds = 10

dotenv.config()

// database
const db = new pg.Client({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'booklist',
  // password: 'estelacodes',
  password: 'administrador',
  port: 5432
})
db.connect()

// middleware
app.use(cors())
app.use(bodyParser.json())

// signup
app.post('/signup', async (req, res) => {
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

// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // consult to the database
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length > 0) {
      // user found, check if hashed password matches form password
      const hashedPassword = result.rows[0].password
      bcrypt.compare(password, hashedPassword, async (_err, same) => {
        if (same) {
          res.json({ success: true, message: 'Login successful!', userId: result.rows[0].id })
        } else {
          res.json({ success: false, message: 'Wrong password. Please try again.' })
        }
      })
    } else {
      // user not found
      res.json({ success: false, message: 'Invalid email. Please try again.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// add to books read
app.post('/api/user-books', async (req, res) => {
  const { user_id, book_id, read_date, review, category } = req.body;

  if (!user_id || !book_id) {
      return res.status(400).json({ error: 'user_id and book_id are required.' });
  }

  try {
      const result = await db.query(
          'INSERT INTO users_books (user_id, book_id, read_date, review) VALUES ($1, $2, $3) ON CONFLICT (user_id, book_id) DO NOTHING',
          [user_id, book_id, read_date || new Date(), review ]
      );

      res.status(201).json({ message: 'Book added suscessfully.' });
  } catch (error) {
      console.error('Error adding book to shelves:', error);
      res.status(500).json({ error: 'Error adding book to shelves.' });
  }
});

// Función para buscar un libro en la base de datos (revisar)
async function buscarLibroEnBD(isbn) {
  const query = 'SELECT * FROM libros WHERE isbn = $1';
  const res = await client.query(query, [isbn]);
  return res.rows[0];
}

// Función para guardar un libro en la base de datos (revisar)
async function guardarLibroEnBD(libro) {
  const query = 'INSERT INTO libros (titulo, autor, isbn, descripcion) VALUES ($1, $2, $3, $4)';
  const values = [libro.title, libro.author, libro.isbn, libro.description];
  await client.query(query, values);
}

// Función principal para obtener un libro (revisar)
async function obtenerLibro(isbn) {
  try {
    // Conectar a la base de datos
    await client.connect();

    // Verificar si el libro ya está en la base de datos
    let libro = await buscarLibroEnBD(isbn);
    if (libro) {
      console.log('Libro encontrado en la base de datos:', libro);
    } else {
      // Si no está en la base de datos, buscar en la API de Google Books
      libro = await buscarLibroEnGoogleBooks(isbn);
      if (libro) {
        console.log('Libro encontrado en Google Books:', libro);
        // Guardar el libro en la base de datos para futuras consultas
        await guardarLibroEnBD(libro);
      } else {
        console.log('No se encontró el libro en Google Books.');
      }
    }
  } catch (err) {
    console.error('Error al obtener el libro:', err);
  } finally {
    // Cerrar la conexión a la base de datos
    await client.end();
  }
}

// get books
async function getBooks () {
  try {
    // const selectQuery = 'SELECT book.id, title, name, tags, rating, review, img_path FROM book INNER JOIN author ON book.id = author.id INNER JOIN review ON book.id = review.id'
    // en realidad se puede mejorar metiendolo directamente en la linea de arriba
    const selectQuery = 'SELECT id, title, author, rating, review, img_path, tags FROM books'
    const result = await db.query(selectQuery)
    const books = result.rows
    return books
  } catch (err) {
    console.log(err)
  }
}

// get quote
async function getQuote () {
  try {
    const response = await axios.get('https://recite.onrender.com/api/v1/random')
    const quote = response.data
    return quote
  } catch (error) {
    console.log(error)
  }
}

// get bestseller books
async function getBestsellers () {
  try {
    const params = {
      'api-key': 'WdGDKFTLRAMvyfPT3LVHZAAUiEaImG0W'
    }
    const response = await axios.get('https://api.nytimes.com/svc/books/v3/lists/overview.json', { params })
    const bestSellers = response.data
    return bestSellers
  } catch (error) {
    console.log(error)
  }
}

// get covers
async function getBookCover (books) {
  const API_URL = 'https://www.googleapis.com'
  let imgPath = ''

  books.forEach(async book => {
    if (book.img_path === null) {
      try {
        const response = await axios.get(API_URL + '/books/v1/volumes', {
          params: {
            q: book.title + '+inauthor:' + book.author // book.name at homeDB
          }
        })
        // console.log(response);
        // console.log(response.data.items[0].volumeInfo)
        imgPath = response.data.items[0].volumeInfo.imageLinks.smallThumbnail
        // console.log(imgPath)
        try {
          await db.query('UPDATE book SET img_path=$1 WHERE id=$2', [imgPath, book.id])
        } catch (err) {
          console.log(err)
        }
      } catch (error) {
        console.error(error)
      }
    }
  })
}

// Función para buscar un libro en la API de Google Books (revisar)
async function buscarLibroEnGoogleBooks(isbn) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  const response = await axios.get(url);
  const libro = response.data.items ? response.data.items[0].volumeInfo : null;
  return libro ? {
    title: libro.title,
    author: libro.authors ? libro.authors.join(', ') : 'Autor desconocido',
    isbn: isbn,
    description: libro.description || 'Sin descripción disponible',
  } : null;
}

app.get('/get-random-quote', async (req, res) => {
  const quoteData = await getQuote()
  res.json(quoteData)
})

app.get('/get-books-google-api', async (req, res) => {
  const books = await getBooksFromGoogleAPI()
  // console.log(books);
  res.json(books)
})

app.get('/get-bestsellers', async (req, res) => {
  const bestSellers = await getBestsellers()
  // console.log(bestSellers);
  res.json(bestSellers)
})

app.get('/get-bookshelf', async (req, res) => {
  const bookshelf = await getBooks()
  await getBookCover(bookshelf)
  console.log(bookshelf)
  res.json(bookshelf)
})

app.get('/api', async (req, res) => {
  const bookData = await getBooks()
  res.json(bookData) // our backend API that will
  // be fetched from the frontend
})

app.listen(port, function (err) {
  if (err) console.log(err)
  console.log('Server listening on PORT', port)
})
