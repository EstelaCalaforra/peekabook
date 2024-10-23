// get bestseller books from NYTimes API
import axios from 'axios'

export async function getBestsellers () {
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

// get book covers from Google API
export async function getBookCover (books, db) {
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
        imgPath = response.data.items[0].volumeInfo.imageLinks.smallThumbnail
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

// get books from database
export async function getBooksDB ({ db }) {
  try {
    // eslint-disable-next-line no-multi-str
    const selectQuery = 'SELECT b.title, b.id_api, array_agg(DISTINCT a.fullname) AS authors, array_agg(c.name) AS categories\
    FROM books b\
    LEFT JOIN book_categories bc ON b.id = bc.book_id\
    LEFT JOIN categories c ON bc.category_id = c.id\
    LEFT JOIN book_authors ba ON b.id = ba.book_id\
    LEFT JOIN authors a ON ba.author_id = a.id GROUP\
    BY b.id'
    const result = await db.query(selectQuery)
    const books = result.rows
    return books
  } catch (error) {
    console.log(error)
  }
}

// get random quote from OnRender API
export async function getQuote () {
  try {
    const response = await axios.get('https://recite.onrender.com/api/v1/random')
    const quote = response.data
    return quote
  } catch (error) {
    console.log(error)
  }
}

// get books from Google API
export async function getBooksGoogleAPI ({ bookQuery }) {
  console.log({ bookQuery })
  try {
    const params = {
      q: bookQuery,
      orderBy: 'relevance',
      printType: 'books',
      langRestrict: 'en',
      maxResults: 10
    }
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { params })
    const { items } = response.data
    return items
  } catch (error) {
    console.log(error)
  }
}
